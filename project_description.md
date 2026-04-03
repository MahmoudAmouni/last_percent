# Low Battery Chat App — Full Project Description

---

## What Is This App?

This is a anonymous social chat app inspired by "Die With Me". The concept is simple and unique:
**you can only use the app when your phone battery is at 20% or below.**

Once you're in, you get matched randomly with a stranger who is also on low battery. You chat with them until one of you runs out of battery. Along the way, at specific battery thresholds, special events are triggered — switching partners, sending friend requests, and exchanging contact info. The whole experience is built around the dying battery as a shared, time-limited bond.

---

## Tech Stack

- **Frontend:** Flutter (mobile app — iOS & Android)
- **Backend:** .NET (REST API)
- **Database:** MySQL (via XAMPP locally, deployable to any MySQL server)
- **Notifications:** WhatsApp Business API (preferred) or Email as fallback
- **Admin Panel:** Web-based dashboard (separate from the Flutter app)

---

## Core User Flow (Read This Carefully)

### 1. Registration & Login
- Users register with an **email and password** only. No name, no avatar — fully anonymous.
- Email must be verified before the user can log in.
- Users can optionally save their **phone number** (used only for WhatsApp friend notifications later).
- Passwords are stored **hashed** (never plain text).

### 2. Entering the App (Battery Gate)
- The app checks the device's current battery level on open.
- **If battery > 20%: the user is blocked from entering.** They see a message telling them to come back when they're below 20%.
- **If battery ≤ 20%: the user is allowed in** and a session is created for them.

### 3. Matchmaking Queue
- Once inside, the user is placed in a **waiting queue**.
- The backend randomly pairs two users from the queue.
- A user will **never be matched with someone they've already chatted with** in a previous match during any session.
- If no one is available, the user simply waits until someone joins.

### 4. The Chat
- Matched users enter a **real-time one-on-one chat**.
- Messages are stored in the database.
- Basic **read receipts** are supported (message marked as read when the other user sees it).
- The chat continues until a battery event is triggered or a session ends.

### 5. The 15% Switch Event
- When **either** user's battery drops to 15%, that user sees a prompt:
  **"Want to connect with a new person?"**
- **If they say NO:** nothing changes, they keep chatting with the same person.
- **If they say YES:**
  - The current match ends (reason saved as "switched").
  - The user who switched is placed back into the **waiting queue** to be matched with someone new.
  - Their previous partner is also disconnected and sees a message: **"You lost your partner. Want to connect with someone new?"**
  - If the partner says yes, they also re-enter the queue.
  - **The user can only switch once per drop to 15%.** They cannot keep switching; the next switch opportunity only comes if they somehow go back above and drop again (edge case — generally each session allows one switch).
  - A user will never be re-matched with someone they already chatted with.

### 6. The 5% Friend Request Event
- When **either** user's battery drops to 5% during a match, that user sees a prompt:
  **"Do you want to be friends with this person?"**
- **If they say YES:**
  - A friend request record is created.
  - **Immediately**, a WhatsApp message (or email fallback) is sent to the OTHER user with the requester's contact info saying:
    *"You were chatting with someone on [date]. They want to be friends with you. Here is their contact: [phone number or email]."*
- **If they say NO:** nothing happens.
- Later, when the OTHER user also hits 5%:
  - They see the same prompt: **"Do you want to be friends with this person?"**
  - **If they say YES:**
    - The friend request is marked as mutually accepted.
    - A notification is sent back to the original requester with the other user's contact info.
    - A permanent **friendship record** is created between the two users.
    - This friendship also prevents them from ever being matched together again.
  - **If they say NO:** only the first user's notification was sent. No friendship is created.
- **Important:** The 5% prompt only appears once per match. If a user never reaches 5% in a session, they never get the prompt for that match.

### 7. Session End
- A session ends when:
  - The user's battery dies (reaches 0%).
  - The user closes the app.
  - The user's phone disconnects unexpectedly.
- When a session ends, the ending battery level is saved and the session is marked as closed.

### 8. Notifications
- All automated messages (friend request alerts, contact sharing) are sent via **WhatsApp** if the user has a phone number saved.
- If no phone number is saved, the notification falls back to **email**.
- Every notification attempt is logged with its status (sent / failed) and the method used.

### 9. Admin Panel
- A separate admin dashboard (not part of the Flutter app) allows admins to:
  - View all currently active sessions.
  - View all live matches.
  - View all friendships formed.
  - Monitor notification delivery logs and retry failed ones.
  - Disable/ban users (soft ban via `is_active` flag).
- Admins log in with a **completely separate account** (not a regular user account).

---

## Database: MySQL

Database name: `lowbattery_app`

Below is a description of every table, what it stores, and why it exists.

---

### Table: `users`
Stores every registered user of the app.

| Column | Type | Description |
|---|---|---|
| `id` | INT, PK, auto-increment | Unique user ID |
| `email` | VARCHAR(255), unique | Login email, must be verified |
| `phone_number` | VARCHAR(20), nullable | Optional — used for WhatsApp notifications |
| `password_hash` | VARCHAR(255) | Bcrypt-hashed password |
| `is_email_verified` | TINYINT(1) | 0 = not verified, 1 = verified. User cannot log in until verified |
| `is_active` | TINYINT(1) | 1 = active, 0 = banned/disabled by admin |
| `created_at` | DATETIME | When the account was created |
| `last_seen` | DATETIME | Last time the user was active in the app |
| `updated_at` | DATETIME | Auto-updated on any row change |

**Notes:**
- No username, no avatar, no display name. Fully anonymous.
- `phone_number` is nullable because it's optional. Users without it only receive email notifications.
- `is_active = 0` means the admin has disabled the account. The user cannot log in.

---

### Table: `sessions`
One row is created every time a user enters the app (battery ≤ 20%). Tracks the full lifecycle of one "low battery session."

| Column | Type | Description |
|---|---|---|
| `id` | INT, PK, auto-increment | Unique session ID |
| `user_id` | INT, FK → users.id | Which user this session belongs to |
| `started_at` | DATETIME | When the user entered the app |
| `ended_at` | DATETIME, nullable | When the session ended (null = still active) |
| `starting_battery_level` | TINYINT | Battery % when they entered (must be ≤ 20) |
| `ending_battery_level` | TINYINT, nullable | Battery % when the session ended |
| `status` | ENUM('active', 'ended') | Current state of the session |

**Notes:**
- A user can have many sessions over time (every time their battery dies and they reopen the app).
- `ended_at` being NULL means the session is currently active.
- This table is the entry point for everything — a user must have an active session to be in the queue or a match.

---

### Table: `waiting_queue`
Holds users who are currently waiting to be matched. A user enters the queue when they first open the app, when their partner disconnects, or when they choose to switch at 15%.

| Column | Type | Description |
|---|---|---|
| `id` | INT, PK, auto-increment | Unique queue entry ID |
| `user_id` | INT, FK → users.id | The waiting user |
| `session_id` | INT, FK → sessions.id | Which session they are waiting in |
| `battery_level` | TINYINT | Their battery % when they joined the queue |
| `queued_at` | DATETIME | When they entered the queue |
| `status` | ENUM('waiting', 'matched', 'cancelled') | Current state |

**Notes:**
- `status = 'waiting'` means the matchmaking engine should consider this user.
- `status = 'matched'` means they've been paired and are now in a match.
- `status = 'cancelled'` means they left the queue (closed the app, battery died, etc.).
- The matchmaking logic queries this table for two users with `status = 'waiting'`, excluding any pair who have already been matched before.

---

### Table: `matches`
One row per pairing between two users. A single user can have multiple match rows in one session (e.g., Ali matched with Bob, then switched and matched with Lisa — two rows for Ali in one session).

| Column | Type | Description |
|---|---|---|
| `id` | INT, PK, auto-increment | Unique match ID |
| `user1_id` | INT, FK → users.id | First user in the match |
| `user2_id` | INT, FK → users.id | Second user in the match |
| `session_id_user1` | INT, FK → sessions.id | Active session of user1 |
| `session_id_user2` | INT, FK → sessions.id | Active session of user2 |
| `matched_at` | DATETIME | When the match started |
| `ended_at` | DATETIME, nullable | When the match ended (null = still active) |
| `ended_by_user_id` | INT, nullable | Who triggered the end (for switches) |
| `ended_reason` | ENUM | Why the match ended (see below) |

**`ended_reason` values:**
- `user1_switched` — user1 hit 15% and chose to switch
- `user2_switched` — user2 hit 15% and chose to switch
- `user1_battery_dead` — user1's phone died
- `user2_battery_dead` — user2's phone died
- `disconnected` — unexpected connection drop

**Notes:**
- `ended_at = NULL` means the match is currently live.
- This table is also used to prevent re-matching: before creating a new match, the backend checks if these two users have any existing row in `matches`.
- Friends (from `friendships` table) are also never re-matched.

---

### Table: `messages`
Stores every chat message sent during a match.

| Column | Type | Description |
|---|---|---|
| `id` | INT, PK, auto-increment | Unique message ID |
| `match_id` | INT, FK → matches.id | Which match this message belongs to |
| `sender_id` | INT, FK → users.id | Who sent the message |
| `content` | TEXT | The message text |
| `sent_at` | DATETIME | When the message was sent |
| `is_read` | TINYINT(1) | 0 = unread, 1 = read by the other user (✓✓) |

**Notes:**
- Messages are linked to a specific match, not just to two users. This means if Ali chats with Bob in one match and then with Lisa in another, the messages are properly separated by match.
- `is_read` is the read receipt. When the recipient opens or scrolls to the message, the backend updates this to 1 and the sender sees ✓✓.
- Messages are stored permanently (not deleted when sessions end).

---

### Table: `friend_requests`
Created when a user hits 5% during a match and is prompted to add their match partner as a friend. Tracks both users' yes/no answers independently, and whether the contact notifications were sent.

| Column | Type | Description |
|---|---|---|
| `id` | INT, PK, auto-increment | Unique request ID |
| `match_id` | INT, FK → matches.id | Which match triggered this request |
| `triggered_by_user_id` | INT, FK → users.id | The user who hit 5% first |
| `other_user_id` | INT, FK → users.id | Their match partner |
| `triggered_user_said_yes` | TINYINT(1) | Did the person who triggered it say yes? |
| `other_user_said_yes` | TINYINT(1) | Did the other person say yes? |
| `notified_other_about_requester` | TINYINT(1) | Was the other user sent the requester's contact? |
| `notified_requester_about_other` | TINYINT(1) | Was the requester sent the other user's contact? |
| `created_at` | DATETIME | When the request was first triggered |
| `resolved_at` | DATETIME, nullable | When both sides answered (or one side's session ended) |

**Notes:**
- One row per match (not per user). Both answers are tracked on the same row.
- `notified_other_about_requester = 1` means the WhatsApp/email with the requester's phone number was successfully sent to the other user.
- `notified_requester_about_other = 1` means the same was done in reverse (only happens when both said yes).
- If `triggered_user_said_yes = 1` but `other_user_said_yes = 0` (or the other user never reached 5%), only the other user gets notified — the friendship is one-sided and no `friendships` row is created.

---

### Table: `friendships`
Created only when **both** users said yes to the friend request. This is the permanent record of a mutual connection.

| Column | Type | Description |
|---|---|---|
| `id` | INT, PK, auto-increment | Unique friendship ID |
| `user1_id` | INT, FK → users.id | First user |
| `user2_id` | INT, FK → users.id | Second user |
| `friend_request_id` | INT, FK → friend_requests.id | The request that led to this friendship |
| `created_at` | DATETIME | When the friendship was formed |

**Notes:**
- `(user1_id, user2_id)` has a UNIQUE constraint to prevent duplicate friendships.
- This table is also checked during matchmaking — two users who are already friends will never be matched together again.
- The app does not show a friends list inside the Flutter app (at this stage). The friendship record is mainly used to exchange contacts and block re-matching.

---

### Table: `notification_logs`
Logs every single automated message the system sends — WhatsApp or email. Used for debugging, retrying failed sends, and admin monitoring.

| Column | Type | Description |
|---|---|---|
| `id` | INT, PK, auto-increment | Unique log ID |
| `user_id` | INT, FK → users.id | The recipient of the notification |
| `type` | ENUM('friend_request', 'phone_shared') | What kind of notification this is |
| `method` | ENUM('email', 'whatsapp') | How it was sent |
| `content` | TEXT | The full message body that was sent |
| `status` | ENUM('pending', 'sent', 'failed') | Delivery status |
| `sent_at` | DATETIME | When the attempt was made |
| `error_msg` | VARCHAR(500), nullable | Error details if status = failed |

**`type` values:**
- `friend_request` — "Someone you chatted with wants to be friends. Here is their contact."
- `phone_shared` — "Your chat partner also wants to be friends. Here is their contact." (sent when both said yes)

**Notes:**
- Every notification attempt gets its own row — if a WhatsApp attempt fails and you retry via email, there are two rows.
- The admin dashboard uses this table to monitor delivery health and manually trigger retries.
- `content` stores the actual message text sent, useful for audit purposes.

---

### Table: `admin_users`
Completely separate from the regular `users` table. Stores admin accounts for the backend dashboard.

| Column | Type | Description |
|---|---|---|
| `id` | INT, PK, auto-increment | Unique admin ID |
| `email` | VARCHAR(255), unique | Admin login email |
| `password_hash` | VARCHAR(255) | Bcrypt-hashed password |
| `created_at` | DATETIME | When the admin account was created |
| `last_login` | DATETIME, nullable | Last successful login timestamp |

**Notes:**
- Admins are never matched, never queued, never part of the app experience.
- Admin authentication should use a separate JWT secret from the user auth.
- Admin accounts are created manually (no self-registration).

---

## Database Views (Pre-built Queries)

### `view_active_sessions`
Returns all users who currently have an active session (inside the app right now).
- Columns: `session_id`, `user_id`, `email`, `starting_battery_level`, `started_at`

### `view_active_matches`
Returns all matches that are currently live (no `ended_at`).
- Columns: `match_id`, `user1_id`, `user2_id`, `matched_at`, `user1_email`, `user2_email`

### `view_friendships`
Returns all friendships with both users' contact details (email + phone number).
- Columns: `id`, `friends_since`, `user1_email`, `user1_phone`, `user2_email`, `user2_phone`

---

## Key Business Rules Summary (Critical for Backend Logic)

1. **Battery gate:** User cannot enter the app if battery > 20%. This check happens on the Flutter side AND should be validated server-side when creating a session.

2. **No re-matching:** Before creating a match, query the `matches` table AND `friendships` table to make sure the two users have never been paired before.

3. **Switch at 15% only:** The switch prompt appears only once when battery reaches exactly 15% (or crosses below it). It does not appear again unless the user re-enters the app in a new session.

4. **Friend prompt at 5% only:** Same logic — triggered once when battery reaches 5%. Only applies to the current active match at that moment.

5. **One-sided notifications are OK:** If Ali says yes at 5% but Lisa never reaches 5%, Ali's number is still sent to Lisa. Lisa just never gets the prompt and no friendship row is created.

6. **Notifications fire immediately:** The moment a user says yes to the friend prompt at 5%, the notification to the other user is sent right away — no waiting for the session to end.

7. **Fallback to email:** If `phone_number` is null for a user, all notifications go to their email instead of WhatsApp. Log the method used in `notification_logs`.

8. **Soft bans:** When `users.is_active = 0`, the user cannot log in or create a session. They should receive a clear error message.

9. **Session uniqueness:** A user can only have one `active` session at a time. If a new session is created, mark any previously active sessions for that user as `ended`.

10. **Admin separation:** Admin JWT tokens and user JWT tokens must use different secrets and different middleware. Admins cannot access user endpoints and users cannot access admin endpoints.

---

## API Endpoints Overview (for .NET Backend)

### Auth
- `POST /api/auth/register` — create user, send verification email
- `POST /api/auth/verify-email` — verify email with token
- `POST /api/auth/login` — login, return JWT
- `POST /api/auth/update-phone` — save/update phone number

### Sessions
- `POST /api/session/start` — create session (validates battery ≤ 20%)
- `POST /api/session/end` — end session (save ending battery)

### Matchmaking
- `POST /api/queue/join` — add user to waiting queue
- `POST /api/queue/leave` — remove user from queue
- `GET /api/queue/status` — check if user has been matched yet

### Chat
- `GET /api/chat/{matchId}/messages` — load message history
- `POST /api/chat/{matchId}/send` — send a message
- `PUT /api/chat/{matchId}/read` — mark messages as read (triggers ✓✓)

### Battery Events
- `POST /api/battery/update` — send current battery level; backend handles 15% and 5% logic
- `POST /api/battery/switch` — user confirms they want to switch at 15%
- `POST /api/battery/friend-request` — user answers yes/no to friend prompt at 5%

### Admin
- `POST /api/admin/login`
- `GET /api/admin/sessions/active`
- `GET /api/admin/matches/active`
- `GET /api/admin/friendships`
- `GET /api/admin/notifications`
- `POST /api/admin/notifications/{id}/retry`
- `PUT /api/admin/users/{id}/ban`

---

## Real-Time Communication

The chat requires **real-time messaging**. Use **SignalR** (built into .NET) for the WebSocket layer.

Events to handle via SignalR:
- `MessageReceived` — new message from match partner
- `PartnerBatteryUpdate` — show partner's battery level live in UI
- `PartnerDisconnected` — partner lost connection or battery died
- `MatchFound` — user has been matched, start chat
- `SwitchPrompt` — trigger the 15% switch UI on the client
- `FriendPrompt` — trigger the 5% friend request UI on the client
- `PartnerSwitched` — notify the other user their partner switched

---

*End of project description.*
