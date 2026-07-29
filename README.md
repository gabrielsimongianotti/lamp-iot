# lampIot
![circuito(1)](https://user-images.githubusercontent.com/26278442/129485034-f961b0ea-2969-4eda-a785-32092925bcad.png)
Control a physical lamp from your phone. A full-stack IoT proof-of-concept with three components:

- **Mobile App** — React Native (Expo) app with a tappable Lottie-animated lamp
- **Backend API** — Express server on Heroku that holds lamp state in memory
- **Firmware** — NodeMCU (ESP8266) sketch that polls the API and drives a relay

## Architecture

```
Mobile App ──POST──> Backend API (Heroku) ──GET──> NodeMCU (ESP8266) ──> Relay ──> Lamp
```

Tap the lamp in the app -> backend state flips -> microcontroller polls the change -> relay toggles the physical lamp.

## App

```bash
cd app
yarn install
yarn start        # Expo dev server
yarn android      # Android emulator
yarn ios          # iOS simulator
yarn web          # Web browser
```

## Backend

```bash
cd backend
yarn install
yarn build        # Compile TypeScript to dist/
yarn start        # node dist/server
yarn dev          # Watch mode (tsc + nodemon)
```

## Firmware

Open `nodemcu/sendData/sendData.ino` in the Arduino IDE (with ESP8266 board support).  
Update Wi-Fi credentials in the sketch, then flash to a NodeMCU board.  
Relay wired to GPIO 15 (D8).

## Tech Stack

| Component | Language | Key Libraries |
|---|---|---|
| App | TypeScript, React Native | Expo, Axios, Lottie |
| Backend | TypeScript, Node.js | Express, CORS |
| Firmware | C++ (Arduino) | ESP8266WiFi, ArduinoJson |
