<div align="center">
  <img src="./last_percent_client/assets/images/last_percent-logo.png" width="140" />
  <h1>Last Percent</h1>
  <p><strong>You can only enter when your battery is dying.</strong></p>

  ![MIT License](https://img.shields.io/badge/license-MIT-black?style=flat-square)
  ![React Native](https://img.shields.io/badge/React_Native-Expo-black?style=flat-square&logo=expo)
  ![.NET](https://img.shields.io/badge/.NET-Backend-black?style=flat-square&logo=dotnet)
  ![MySQL](https://img.shields.io/badge/MySQL-Database-black?style=flat-square&logo=mysql)

</div>

---

<div align="center">
  <img src="./Readme/welcomescreen.png" width="30%" />
  &nbsp;
  <img src="./Readme/chatting.png" width="30%" />
  &nbsp;
  <img src="./Readme/batterygate1.png" width="30%" />
</div>

---

## What is Last Percent?

Last Percent is an anonymous chat app with one rule — **your battery must be at 20% or below to get in.** You're matched with a random stranger in the same situation. No names. No profiles. Just two people and a dying battery.

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

<div align="center">
  <img src="./Readme/login.png" width="23%" />
  <img src="./Readme/register.png" width="23%" />
  <img src="./Readme/batterygate2.png" width="23%" />
  <img src="./Readme/waitingscreen.png" width="23%" />
  <br/><br/>
  <img src="./Readme/chatting.png" width="23%" />
  <img src="./Readme/partnerleft.png" width="23%" />
  <img src="./Readme/suspension.png" width="23%" />
</div>

---

## Tech Stack

| Layer | Technology |
|---|---|
| Mobile | React Native (Expo) |
| Backend | .NET REST API |
| Real-time | SignalR (WebSockets) |
| Database | MySQL |
| State | Zustand |
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

- 🔋 **Battery Gate** — entry locked above 20%
- 🎲 **Random Matching** — never matched with the same person twice
- 🔄 **15% Switch** — swap to a new stranger mid-session
- 🤝 **5% Friend Request** — mutual contact exchange via WhatsApp or email
- 👤 **Fully Anonymous** — no names, no profiles

---

<div align="center">
  <sub>MIT License · Built for the low battery survivors.</sub>
</div>