<div align="center">
  <img src="./last_percent_client/assets/images/last_percent-logo.png" width="200" />
  <h1>Last Percent</h1>
  <p>Anonymous social chat app for the low battery survivors.</p>
</div>

---

## ⚡ The Concept
**Last Percent** is a social experiment where you can only chat when your phone battery is at **20% or below**. Once you're in, you're matched with a stranger who is also on low battery. Chat until one of you runs out of power.

## 🚀 Tech Stack
- **Frontend:** React Native Expo (iOS & Android)
- **Backend:** .NET (REST API + SignalR)
- **Real-time:** SignalR
- **Database:** MySQL
- **State Management:** Zustand
- **Navigation:** Expo Router

## ✨ Key Features
- **Battery Gate:** Entrance strictly limited to ≤ 20% battery.
- **Real-time Matchmaking:** Instant pairing with other low-battery users.
- **15% Switch Event:** Option to change partners when battery drops further.
- **5% Friend Request:** Mutual contact exchange before the phone dies.
- **Anonymous:** No names, no profiles—just two people and a dying battery.

## 📸 Screenshots
<div align="center">
  <img src="./Readme/welcomescreen.png" width="32%" />
  <img src="./Readme/login.png" width="32%" />
  <img src="./Readme/register.png" width="32%" />
  <br />
  <img src="./Readme/batterygate1.png" width="32%" />
  <img src="./Readme/batterygate2.png" width="32%" />
  <img src="./Readme/waitingscreen.png" width="32%" />
  <br />
  <img src="./Readme/chatting.png" width="32%" />
  <img src="./Readme/partnerleft.png" width="32%" />
  <img src="./Readme/suspension.png" width="32%" />
</div>

## 🛠️ Getting Started

### Prerequisites
- Node.js & npm
- .NET SDK
- MySQL Server

### Client Setup
```bash
cd last_percent_client
npm install
npx expo start
```

### Server Setup
```bash
cd last_percent_server
dotnet restore
dotnet run
```

## 📄 License
MIT License. See [LICENSE](./LICENSE) for details.
