# 🎵 BeatGuess (Song Guessable)

> **The ultimate progressive music trivia game.** Can you identify the track from just a **0.1-second** snippet?

![BeatGuess Demo Banner](https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80)

---

## ⚡ Overview

**BeatGuess** is a modern, fast-paced music guessing web application inspired by *Heardle* and *guessable.gg*. Players are challenged to identify iconic songs across different genres and eras using progressive audio snippets starting from **0.1s** up to **8.0s**.

With real-time dynamic chart ingestion, players never run out of fresh tracks or face repetitive rounds.

---

## 🚀 Key Features

- **⏱️ Progressive Audio Gating**: 5 guessing attempts with time-gated snippet intervals: `[0.1s, 0.5s, 1.5s, 3.0s, 8.0s]`.
- **🎚️ Popularity-Based Difficulty Modes**:
  - 🌟 **Easy**: Billion+ stream mega-hits & global #1s.
  - ⚡ **Medium**: Radio hits & well-known catalog anthems.
  - 🔥 **Hard**: Moderately known chart tracks & deeper genre favorites.
  - 🛡️ **Expert**: Cult classics & acclaimed album cuts.
  - 💀 **Impossible**: Obscure B-sides & deep underground tracks.
- **🎸 Multi-Genre & Era Filtering**:
  - **Genres**: Bollywood, Pop, Rock, Hip-Hop, EDM, K-Pop, Latin, 80s/90s.
  - **Eras**: 80s, 90s, 2000s, 2010s, 2020s.
- **🔍 Instant Autocomplete Search**: Fuzzy queries across millions of tracks in real-time ($\ge 3$ characters) with album artwork thumbnails.
- **🌊 60fps Circular Spectrum Visualizer**: Dynamic frequency visualizer rendered in real-time via Web Audio `AnalyserNode`.
- **🏆 Lifetime Statistics & Streaks**: Win rates, streaks, guess distribution histogram, and level/XP progression stored locally.
- **🎉 Social Share Grid**: Wordle-style emoji summary grid to share scores and streaks with friends.
- **🌐 Dynamic Live Audio Stream**: Streams high-fidelity AAC previews directly from Apple's CDN with zero login or subscription requirements.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Vanilla CSS with Dark Luxury Glassmorphism & Neon Glows
- **Audio Subsystem**: Web Audio API (`AudioContext`, `GainNode`, `AnalyserNode`) + HTML5 Audio Element streaming
- **Icons & Effects**: `lucide-react`, `canvas-confetti`
- **Data Source**: Apple iTunes Search API & Live Apple Top 100 RSS Feeds

---

## 🏁 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/AyanKoche/song-guessable.git

# Navigate to project directory
cd song-guessable

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open `http://localhost:5173/` in your browser to start playing!

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
