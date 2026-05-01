# GRAVITY GARDEN — Physics Sandbox

A 2D physics simulation sandbox built in vanilla JavaScript (HTML5 Canvas API).  
Spawn objects, watch gravity take over, and let chaos bloom into something beautiful.


*Developed by:* Pablo, Christel Jean C., and Dig, Karina Cassandra M.
*Language:* JavaScript (HTML5 Canvas)  
*Course / Project:* Programming 2 — 9338-AY225 | Group 6

---

## Table of Contents

- [Game Description](#game-description)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
  - [Playing on Desktop / Laptop](#playing-on-desktop--laptop)
  - [Playing via GitHub Pages](#playing-via-github-pages)
- [Controls](#controls)
- [Code Structure](#code-structure)
- [Screenshots](#screenshots)

---

## Game Description

*GRAVITY GARDEN* is an interactive 2D physics sandbox where you click to spawn objects into a living, reactive world governed by gravity, collision, and momentum. Watch your creations bounce, collide, and settle in real time — no rules, no objectives, just pure physics fun.

We are *Group 6*, composed of *Christel Jean C. Pablo* and *Karina Cassandra M. Dig*, assigned to develop a Physics Sandbox Game as part of our Programming 2 project. Our goal is to create an interactive environment where players can experiment with physics concepts in a fun and engaging way, combining creativity with educational value.

The sandbox features:

- Real-time 2D physics simulation with gravity and collision detection
- Click-to-spawn object system with dynamic physics responses
- Smooth HTML5 Canvas rendering with visual effects
- Sound feedback for object interactions
- A calm, creative space to experiment with physics concepts

---

## Features

| Feature | Details |
| --- | --- |
| Physics Engine | Real-time gravity, velocity, and collision simulation |
| Object Spawning | Click anywhere on the canvas to spawn physics objects |
| Visual Effects | Particle bursts and visual feedback via effects.js |
| Sound System | Audio cues for spawning and collisions via sounds.js |
| Responsive Canvas | Scales cleanly in any modern browser |
| No Installation | Runs directly in-browser — open and play instantly |

---

## Setup Instructions

### Playing on Desktop / Laptop

No installation required. *GRAVITY GARDEN* runs entirely in your browser.

*Step 1 — Download the repository*

Click the green Code button on this repository, then select *Download ZIP*. Extract the ZIP file to any folder on your computer.

*Step 2 — Open the game*

Find index.html inside the physics_Sandbox folder. Double-click it. It will open directly in your default web browser (Chrome, Edge, or Firefox recommended).

*Step 3 — Play*

Click anywhere on the canvas to start spawning objects and watch physics take over.

**Note:** No internet connection is required after downloading. No server, Node.js, or installs of any kind are needed.


---

### Playing via GitHub Pages

To host the sandbox online so anyone can play it with just a link:

1. Push all project files to your GitHub repository
2. Make sure the entry file is named index.html
3. Go to your repo on GitHub → *Settings* → *Pages*
4. Under *Source*, select Deploy from a branch
5. Choose branch: main, folder: / (root) → click *Save*
6. Wait about 1 minute, then your game will be live at:

https://<your-username>.github.io/<your-repo-name>/physics_Sandbox/index.html

---

## Controls

### Desktop Controls

| Input | Action |
| --- | --- |
| *Left Mouse Click* | Spawn a physics object at cursor position |
| *Mouse Movement* | Aim / position where the next object will appear |

Objects respond to gravity immediately upon spawning and interact with each other through collision.


---

## Code Structure

physics_Sandbox/
├── Js/
│   ├── effects.js     # Visual effects and particle systems
│   ├── game.js        # Core game loop and physics logic
│   ├── object.js      # Physics object definitions and behavior
│   └── sounds.js      # Sound effects and audio management
├── index.html         # Entry point — open this to run the game
├── script.js          # Main script initialization
├── style.css          # Canvas and UI styling
└── README.md          # This file

All game logic is organized across clearly separated files:

| File / Section | Description |
| --- | --- |
| game.js | Main game loop, delta-time updates, physics step |
| object.js | Object factory — defines mass, velocity, shape, and collision behavior |
| effects.js | Handles particle bursts, trails, and visual feedback on spawn/collision |
| sounds.js | Audio engine for spawn and collision sound cues |
| script.js | Entry point — initializes canvas and wires up input events |
| style.css | Canvas sizing, background, and UI element styling |

---