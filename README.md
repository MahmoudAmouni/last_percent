<div align="center">
  <img src="./last_percent_client/assets/images/last_percent-logo.png" width="240" />
  <h1>Last Percent</h1>
  <p><strong>You can only enter when your battery is dying.</strong></p>
</div>

---

## What is Last Percent?

Last Percent is an anonymous chat app with one rule  **your battery must be at 20% or below to get in.** You're matched with a random stranger in the same situation. No names. No profiles. Just two people and a dying battery.

---

## How It Works

| Battery | Event |
|---|---|
| ≤ 20% | Gates open. You're matched with a stranger. |
| 15% | Option to switch to a new person. |
| 5% | Option to exchange contacts before it's over. |
| 0% | Connection lost. |

---

## Screenshots

<table align="center">
  <tr>
    <td align="center" width="30%">
      <img src="./Readme/welcomescreen.png" width="100%" style="border-radius:12px"/>
      <br/><sub><b>Welcome</b></sub>
    </td>
    <td align="center" width="30%">
      <img src="./Readme/login.png" width="100%" style="border-radius:12px"/>
      <br/><sub><b>Login</b></sub>
    </td>
    <td align="center" width="30%">
      <img src="./Readme/register.png" width="100%" style="border-radius:12px"/>
      <br/><sub><b>Register</b></sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="30%">
      <img src="./Readme/batterygate1.png" width="100%" style="border-radius:12px"/>
      <br/><sub><b>Battery Gate -Locked</b></sub>
    </td>
    <td align="center" width="30%">
      <img src="./Readme/batterygate2.png" width="100%" style="border-radius:12px"/>
      <br/><sub><b>Battery Gate -Unlocked</b></sub>
    </td>
    <td align="center" width="30%">
      <img src="./Readme/waitingscreen.png" width="100%" style="border-radius:12px"/>
      <br/><sub><b>Waiting for Match</b></sub>
    </td>
  </tr>
  <tr>
    <td align="center" width="30%">
      <img src="./Readme/chatting.png" width="100%" style="border-radius:12px"/>
      <br/><sub><b>Chat</b></sub>
    </td>
    <td align="center" width="30%">
      <img src="./Readme/partnerleft.png" width="100%" style="border-radius:12px"/>
      <br/><sub><b>Partner Left</b></sub>
    </td>
    <td align="center" width="30%">
      <img src="./Readme/suspension.png" width="100%" style="border-radius:12px"/>
      <br/><sub><b>Suspended Account</b></sub>
    </td>
  </tr>
</table>

---

## Tech Stack

| Layer | Technology |
|---|---|
| Mobile | React Native (Expo) |
| Backend | .NET REST API |
| Real-time | Sockets.io |
| Database | MySQL |
| Navigation | Expo Router |

---

## Getting Started

**Prerequisites:** Node.js, .NET SDK, MySQL

```bash
# Client
cd last_percent_client
npm install
npx expo start

# Server
cd last_percent_server
dotnet restore
dotnet run
```

---

## Features

- 🔋 **Battery Gate** - entry locked above 20%
- 🎲 **Random Matching** - never matched with the same person twice
- 🔄 **15% Switch** - swap to a new stranger mid-session
- 🤝 **5% Friend Request** - mutual contact exchange via WhatsApp or email
- 👤 **Fully Anonymous** - no names, no profiles

---

<div align="center">
  <sub>MIT License · Built for the low battery survivors.</sub>
</div>