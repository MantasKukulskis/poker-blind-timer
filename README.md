# ♠️ Poker Tournament Timer

A full-featured web application for managing **poker tournament blind levels**, **breaks**, and **timing**. Built with **React**, **Tailwind CSS**, and **i18next**, this tool supports **auto-level progression**, **blind customization**, **language switching**, and **sound alerts**.

Designed for fast-paced, real-world tournaments with an intuitive interface and fullscreen support.

---

## 🌐 Live Demo

🔗 [Live Site](https://your-poker-timer-site.com)  
📁 [Source Code](https://github.com/MantasKukulskis/poker-timer)

---

## 🎯 Features

- ✅ Set level duration, starting blinds, and blind growth (double, fixed, standard)
- ✅ Automatic blind level progression
- ✅ Configurable breaks every X levels
- ✅ Sound alerts:
  - ⏰ One minute left
  - 🔔 New blind level
  - 🧘 Break start / end
- ✅ Fullscreen in-game display with countdown and blinds
- ✅ Break screen with its own background and timer
- ✅ Pause / Resume / Reset controls
- ✅ Level table with current blind highlight
- ✅ Multilingual UI with 🇱🇹 Lithuanian and 🇬🇧 English support
- ✅ Responsive layout with mobile support
- ✅ Manual break resume option
- ✅ Flag-based language switcher
- ✅ Clean and responsive design using Tailwind CSS

---

## 🛠 Tech Stack

- **Frontend:** React, React Context API, Tailwind CSS
- **Routing & Translations:** React-i18next, i18next-browser-languagedetector
- **Build Tool:** Vite
- **Assets:** Audio & image files in `/public` folder
- **Deployment:** Firebase Hosting *(recommended)*

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)

### Installation

```bash
git clone https://github.com/MantasKukulskis/poker-blind-timer.git
cd poker-blind-timer
npm install
npm run dev

Then open:
👉 http://localhost:5173
Folder Structure

src/
  components/
    SettingsForm.jsx
    Timer.jsx
    Break.jsx
    Fullscreen.jsx
    LanguageSwitcher.jsx
  context/
    TournamentContext.jsx
  locales/
    en/translation.json
    lt/translation.json
public/
  img/
    flag-en.svg
    flag-lt.svg
    in_game.jpg
    poker_background.jpg
  audio/
    break_start.mp3
    break_end.mp3

🧪 Testing

    Test settings form with various blind/growth/break configs

    Verify break logic triggers after correct level

    Check fullscreen and language switching in action

👨‍💻 Author

Mantas Kukulskis
🔗 GitHub
⚠️ License

Licensed under the MIT License
📚 References

    React Documentation

    Tailwind CSS

    Vite

    React-i18next Docs