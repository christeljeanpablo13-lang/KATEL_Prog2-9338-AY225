# ✏️ CRAYON PHYSICS — Physics Sandbox Puzzle Game

> A 2D physics sandbox built in vanilla JavaScript (HTML5 Canvas API).  
> Draw shapes, drop goo balls, and solve puzzles — all with a warm crayon hand-drawn feel.

**Developed by:** Pablo, Christel Jean C., and Dig, Karina Cassandra M.  
**Language:** JavaScript (HTML5 Canvas)  
**Course / Project:** Programming 2 — 9338-AY225 | Group 6

---

## Table of Contents

- [Game Description](#game-description)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
  - [Playing on Desktop / Laptop](#playing-on-desktop--laptop)
  - [Playing via GitHub Pages](#playing-via-github-pages)
- [Controls](#controls)
- [Gameplay Guide](#gameplay-guide)
  - [Game Modes](#game-modes)
  - [Spawnable Objects](#spawnable-objects)
  - [Tools](#tools)
  - [Level List](#level-list)
- [Code Structure](#code-structure)
- [Screenshots](#screenshots)
- [Notes](#notes)

---

## Game Description

**CRAYON PHYSICS** is an interactive 2D physics-based sandbox puzzle game where players can draw shapes, spawn objects, and experiment with realistic physics. The game features both **Free Mode** for creative play and **Level Mode** for solving physics-based puzzles.

We are **Group 6**, composed of **Christel Jean C. Pablo** and **Karina Cassandra M. Dig**, assigned to develop a Physics Sandbox Game as part of our Programming 2 project. Our goal is to create an interactive environment where players can experiment with physics concepts in a fun and engaging way — combining creativity with educational value.

Players can:

* Draw lines that interact with objects
* Spawn balls, boxes, ropes, bombs, and more
* Solve puzzles using physics logic
* Freely experiment in sandbox mode

The game also features:

* World of Goo-style animated goo balls with eyes, wobble, and squish
* A full landing screen with menu, instructions panel, and animated doodles
* Sound effects with cooldown protection and randomized pitch
* Particle celebration effects on scoring and level clear

---

## Features

| Feature | Details |
| --- | --- |
| Landing Screen | Animated menu with Play, Free Mode, and How to Play buttons |
| Drawing System | Click and drag to draw multi-layer crayon-textured shapes |
| Physics Engine | Realistic gravity, bounce, friction, and collision simulation |
| Goo Balls | Animated World of Goo-style balls with eyes that follow the goal |
| Multiple Object Types | Ball, Box, Dog, Goo, Rope, Chain, Bomb, Star |
| Tools | Draw, Drag, Erase, Freeze |
| Level Mode | 8 physics puzzle levels with star scoring system |
| Free Mode | No rules — draw anything, spawn anything, experiment freely |
| Rope & Chain Physics | Drag to create hanging ropes or rigid chains |
| Explosion Mechanics | Bombs explode after 2 seconds, launching nearby objects |
| Save / Load System | 5 save slots stored in localStorage |
| Gravity Toggle | Turn gravity on/off at any time |
| Sound System | Bounce, score, and win SFX with randomized pitch; looping BGM |
| Particle Effects | Confetti burst on scoring, celebration on level clear |
| Animated UI | Landing page with floating doodles and card entrance animation |
| Responsive Canvas | Scales to fit any screen size |

---

## Setup Instructions

### Playing on Desktop / Laptop

No installation required. **CRAYON PHYSICS** runs entirely in your browser.

**✅ Option 1: Simple Run (Recommended)**

**Step 1 — Download the repository**

Click the green `Code` button on this repository, then select **Download ZIP**. Extract the ZIP file to any folder on your computer.

**Step 2 — Navigate to the game folder**

Open the extracted folder and go into:

```
KATEL_Prog2-9338-AY225 > physics_Sandbox
```

**Step 3 — Open the game**

Find `index.html` inside the `physics_Sandbox` folder. Double-click it — it will open directly in your default web browser (Chrome recommended).

> **Note:** No internet connection is required after downloading. No server, Node.js, or installs of any kind are needed.

---

**✅ Option 2: Using VS Code with Live Server**

1. Open the `physics_Sandbox` folder in **Visual Studio Code**
2. Install the **Live Server** extension (by Ritwick Dey)
3. Right-click `index.html` in the file tree
4. Click **"Open with Live Server"**

---

**Step 4 — Play**

Choose **▶ Play** to start Level Mode, **🎨 Free Mode** to experiment freely, or **📖 How to Play** for in-game instructions.

---

### Playing via GitHub Pages

To host the game online so anyone can play it with just a link:

1. Push all project files to your GitHub repository
2. Make sure the entry file is named `index.html`
3. Go to your repo on GitHub → **Settings** → **Pages**
4. Under **Source**, select `Deploy from a branch`
5. Choose branch: `main`, folder: `/ (root)` → click **Save**
6. Wait about 1 minute, then your game will be live at:

```
https://<your-username>.github.io/<your-repo-name>/physics_Sandbox/index.html
```

---

## Controls

### 🖱️ Mouse Controls

| Input | Action |
| --- | --- |
| **Left Click + Drag** | Draw a crayon line / shape on the canvas |
| **Left Click** (Spawn mode) | Spawn the selected object at cursor position |
| **Left Click** (Drag tool) | Pick up and move a physics object |
| **Left Click** (Erase tool) | Delete a drawn shape or object |
| **Left Click** (Freeze tool) | Freeze or unfreeze an object in place |
| **Escape** | Close the instructions panel |

---

### 🛠️ Tools (Top Bar)

| Tool | Icon | Description |
| --- | --- | --- |
| Draw | ✏️ | Click and drag to draw freehand crayon lines on the canvas |
| Drag | ✋ | Click and drag any physics object to reposition it |
| Erase | 🗑️ | Click on any drawn line or spawned object to remove it |
| Freeze | ❄️ | Click any object to freeze it in place (or unfreeze it) |

---

### 🎨 Drawing Controls

| Control | Action |
| --- | --- |
| **Color Palette** | Click any color dot in the top bar to change crayon color |
| **Thickness Slider** | Drag the slider to adjust line thickness |

---

### 🧩 Object Spawning (Left Toolbar)

| Object | Icon |
| --- | --- |
| Ball | ⚽ |
| Box | 📦 |
| Dog | 🐕 |
| Goo | 🟢 |
| Rope | 🪢 |
| Chain | ⛓️ |
| Bomb | 💣 |
| Star | ⭐ |

---

### ⚙️ Other Controls

| Button | Action |
| --- | --- |
| 🗑️ **Clear** | Remove everything from the canvas |
| 💾 **Save** | Open the Save / Load panel (5 slots) |
| 🌍 **Gravity** | Toggle gravity ON / OFF |

---

## Gameplay Guide

### Game Modes

| Mode | Description |
| --- | --- |
| 🧩 **Level Mode** | Solve 8 physics puzzles — guide goo balls into the goal using drawn shapes and spawned objects. Fewer drawings = more stars. |
| 🎨 **Free Mode** | No rules, no objectives — draw anything, spawn anything, and experiment with physics freely. |

---

### Spawnable Objects

| Object | Icon | Description |
| --- | --- | --- |
| Ball | ⚽ | Bouncy circle that rolls and collides naturally |
| Box | 📦 | Heavy square block — great for stacking and redirecting |
| Dog | 🐕 | A roaming companion that walks and randomly jumps |
| Goo | 🟢 | Squishy blob of spring-connected balls |
| Rope | 🪢 | Click and drag to endpoint and release to hang a rope |
| Chain | ⛓️ | Same as rope but rendered with a rigid chain appearance |
| Bomb | 💣 | Explodes after 2 seconds — launches nearby objects flying |
| Star | ⭐ | Collectible item — collect all to win in Level Mode |

---

### Tools

| Tool | Icon | Description |
| --- | --- | --- |
| Draw | ✏️ | Click and drag to draw freehand crayon lines on the canvas |
| Drag | ✋ | Click and drag any physics object to reposition it |
| Erase | 🗑️ | Click on any drawn line or spawned object to remove it |
| Freeze | ❄️ | Click any object to freeze it in place (or unfreeze it) |

---

### Level List

| # | Level Name | Objective |
| --- | --- | --- |
| 1 | Drop the ball! | Guide the ball into the glass |
| 2 | Protect the star! | Collect all 3 stars |
| 3 | Land safely! | Land the ball on the green pad |
| 4 | Domino Effect | Topple dominoes to push the ball to the goal |
| 5 | Goo Madness! | Fill the glass with goo blobs |
| 6 | Rube Goldberg | Draw ramps to guide 2 balls into the goal |
| 7 | Zero Gravity?! | Navigate the ball without gravity |
| 8 | Star Collector | Collect all 5 stars with a single ball |

> **Scoring:** Clearing a level with 5 or fewer drawings earns ⭐⭐⭐. Under 10 earns ⭐⭐. More than 20 earns ⭐.

---

## Code Structure

```
physics_Sandbox/
├── Js/
│   ├── effects.js     # Particle class — confetti, stars, squares, celebration bursts
│   ├── game.js        # Core game loop, level definitions, physics config, rendering
│   ├── object.js      # GooBall and DrawnShape classes with physics and crayon texture
│   └── sounds.js      # Sound manager — SFX cooldown, pitch randomization, BGM fade
├── index.html         # Entry point — all UI, landing screen, canvas, and main JS
├── script.js          # Input handling, tool logic, draw preview, flow control, HUD
├── style.css          # Full UI styling — menu, HUD, win screen, tools, animations
└── README.md          # This file
```

| File / Section | Description |
| --- | --- |
| `index.html` | Landing screen, instructions overlay, top bar, spawn toolbar, win overlay, canvas |
| `game.js` | Level definitions, physics constants, game loop, platform and goal rendering |
| `object.js` | `GooBall` — animated goo with eyes, wobble, squish; `DrawnShape` — crayon multi-layer texture |
| `effects.js` | `Particle` class with circle/star/square shapes; `spawnParticles()` and `spawnCelebration()` |
| `sounds.js` | `playSound()` with cooldown and pitch randomization; `startMusic()`, `fadeOutMusic()` |
| `script.js` | Pointer events, tool switching, draw preview, `startLevel()`, `showWin()`, HUD sync |
| `style.css` | Parchment theme, landing card animation, menu buttons, tool bar, responsive layout |

---

## Screenshots

> *(Replace the placeholders below with actual screenshots of your final build)*

To add screenshots:
1. Take a screenshot of the running game
2. Save the images in a `screenshots/` folder inside `physics_Sandbox/`
3. Update the paths below

**📌 1. Landing Page** — Game title, Play / Free Mode / Instructions buttons

```
![Landing Screen](screenshots/landing.png)
```

**📌 2. Gameplay — Free Mode** — Drawing lines, spawned objects interacting

```
![Free Mode](screenshots/free_mode.png)
```

**📌 3. Level Mode** — Puzzle UI, goal area, score display

```
![Level Mode](screenshots/level_mode.png)
```

**📌 4. Tools & UI** — Top toolbar, left spawn menu, bottom info bar

```
![Tools and UI](screenshots/tools_ui.png)
```

**📌 5. Win Screen** — "Level Clear!" popup with stars rating

```
![Win Screen](screenshots/win_screen.png)
```

---

## Notes

* Best experienced on **desktop**
* Requires a modern browser — **Chrome, Edge, or Firefox** recommended
* Sound may require a user interaction (click) before playing due to browser autoplay policies

---

*Made with 💛 for Prog2 — 9338-AY225*
