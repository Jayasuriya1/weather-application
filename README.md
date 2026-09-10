# 🌤️ Weather Forecast Application

A lightweight, responsive, and modern React weather application that displays real-time weather information for any city worldwide using the OpenWeatherMap API.

---

## ✨ Features

- **Real-Time Weather Data**: Get current temperature, weather conditions, humidity, wind speed, atmospheric pressure, and min/max temperatures.
- **Dynamic Themes**: Interactive UI background theme that automatically changes based on current weather conditions (Clear, Clouds, Rain, Snow, Thunderstorm, Mist).
- **Instant Search**: Search weather by city name with support for both button click and pressing the `Enter` key.
- **Glassmorphism Design**: Sleek dark mode interface with glassmorphism card styling and smooth animations.
- **Error Handling**: Graceful error messages when searching for invalid cities or during network issues.

---

## 🚀 Tech Stack

- **Frontend**: React.js (Hooks, Functional Components)
- **Styling**: Custom CSS (Glassmorphism design, CSS Gradients, Flexbox/Grid)
- **UI & Icons**: Bootstrap 5 & Boxicons
- **Weather API**: [OpenWeatherMap API](https://openweathermap.org/api)

---

## 🛠️ Getting Started

### 1. Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2. Installation

Clone the repository and install the project dependencies:

```bash
git clone https://github.com/Jayasuriya1/weather-application.git
cd weather-application
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory (or copy `.env.example`):

```bash
cp .env.example .env
```

Set your OpenWeatherMap API key inside `.env`:

```env
REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key_here
```

### 4. Running the App

Start the development server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📂 Project Structure

```text
weather-application/
├── public/
│   └── index.html
├── src/
│   ├── App.js        # Main React component with weather fetch logic
│   ├── App.css       # Glassmorphism styling and dynamic weather themes
│   ├── App.test.js   # Component unit tests
│   └── index.js      # React DOM entry point
└── package.json
```

---

## 👨‍💻 Author

Created by **Jayasuriya**.
