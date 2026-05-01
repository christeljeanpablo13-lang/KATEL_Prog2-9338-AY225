✏️ CRAYON PHYSICS — Physics Sandbox Puzzle Game

A 2D physics sandbox built in vanilla JavaScript (HTML5 Canvas API).
Draw shapes, drop goo balls, and solve puzzles — all with a warm crayon hand-drawn feel.

Developed by: Pablo, Christel Jean C., and Dig, Karina Cassandra M.
Language: JavaScript (HTML5 Canvas)
Course / Project: Programming 2 — 9338-AY225 | Group 6

Table of Contents

Game Description
Features
Setup Instructions

Playing on Desktop / Laptop
Playing via GitHub Pages


Controls
Gameplay Guide

Game Modes
Spawnable Objects
Tools
Level List


Code Structure
Screenshots
Notes


Game Description
CRAYON PHYSICS is an interactive 2D physics-based sandbox puzzle game where players can draw shapes, spawn objects, and experiment with realistic physics. The game features both Free Mode for creative play and Level Mode for solving physics-based puzzles.
We are Group 6, composed of Christel Jean C. Pablo and Karina Cassandra M. Dig, assigned to develop a Physics Sandbox Game as part of our Programming 2 project. Our goal is to create an interactive environment where players can experiment with physics concepts in a fun and engaging way — combining creativity with educational value.
Players can:

Draw lines that interact with objects
Spawn balls, boxes, ropes, bombs, and more
Solve puzzles using physics logic
Freely experiment in sandbox mode

The game also features:

World of Goo-style animated goo balls with eyes, wobble, and squish
A full landing screen with menu, instructions panel, and animated doodles
Sound effects with cooldown protection and randomized pitch
Particle celebration effects on scoring and level clear


Features
FeatureDetailsLanding ScreenAnimated menu with Play, Free Mode, and How to Play buttonsDrawing SystemClick and drag to draw multi-layer crayon-textured shapesPhysics EngineRealistic gravity, bounce, friction, and collision simulationGoo BallsAnimated World of Goo-style balls with eyes that follow the goalMultiple Object TypesBall, Box, Dog, Goo, Rope, Chain, Bomb, StarToolsDraw, Drag, Erase, FreezeLevel Mode8 physics puzzle levels with star scoring systemFree ModeNo rules — draw anything, spawn anything, experiment freelyRope & Chain PhysicsDrag to create hanging ropes or rigid chainsExplosion MechanicsBombs explode after 2 seconds, launching nearby objectsSave / Load System5 save slots stored in localStorageGravity ToggleTurn gravity on/off at any timeSound SystemBounce, score, and win SFX with randomized pitch; looping BGMParticle EffectsConfetti burst on scoring, celebration on level clearAnimated UILanding page with floating doodles and card entrance animationResponsive CanvasScales to fit any screen size

Setup Instructions
Playing on Desktop / Laptop
No installation required. CRAYON PHYSICS runs entirely in your browser.

✅ Option 1: Simple Run (Recommended)
Step 1 — Download the repository
Click the green Code button on this repository, then select Download ZIP. Extract the ZIP file to any folder on your computer.
Step 2 — Navigate to the game folder
Open the extracted folder and go into:
KATEL_Prog2-9338-AY225 > physics_Sandbox
Step 3 — Open the game
Find index.html inside the physics_Sandbox folder. Double-click it — it will open directly in your default web browser (Chrome recommended).

Note: No internet connection is required after downloading. No server, Node.js, or installs of any kind are needed.


✅ Option 2: Using VS Code with Live Server

Open the physics_Sandbox folder in Visual Studio Code
Install the Live Server extension (by Ritwick Dey)
Right-click index.html in the file tree
Click "Open with Live Server"


Step 4 — Play
Choose ▶ Play to start Level Mode, 🎨 Free Mode to experiment freely, or 📖 How to Play for in-game instructions.

Playing via GitHub Pages
To host the game online so anyone can play it with just a link:

Push all project files to your GitHub repository
Make sure the entry file is named index.html
Go to your repo on GitHub → Settings → Pages
Under Source, select Deploy from a branch
Choose branch: main, folder: / (root) → click Save
Wait about 1 minute, then your game will be live at:

https://<your-username>.github.io/<your-repo-name>/physics_Sandbox/index.html

Controls
🖱️ Mouse Controls
InputActionLeft Click + DragDraw a crayon line / shape on the canvasLeft Click (Spawn mode)Spawn the selected object at cursor positionLeft Click (Drag tool)Pick up and move a physics objectLeft Click (Erase tool)Delete a drawn shape or objectLeft Click (Freeze tool)Freeze or unfreeze an object in placeEscapeClose the instructions panel

🛠️ Tools (Top Bar)
ToolIconDescriptionDraw✏️Click and drag to draw freehand crayon lines on the canvasDrag✋Click and drag any physics object to reposition itErase🗑️Click on any drawn line or spawned object to remove itFreeze❄️Click any object to freeze it in place (or unfreeze it)

🎨 Drawing Controls
ControlActionColor PaletteClick any color dot in the top bar to change crayon colorThickness SliderDrag the slider to adjust line thickness

🧩 Object Spawning (Left Toolbar)
ObjectIconBall⚽Box📦Dog🐕Goo🟢Rope🪢Chain⛓️Bomb💣Star⭐

⚙️ Other Controls
ButtonAction🗑️ ClearRemove everything from the canvas💾 SaveOpen the Save / Load panel (5 slots)🌍 GravityToggle gravity ON / OFF

Gameplay Guide
Game Modes
ModeDescription🧩 Level ModeSolve 8 physics puzzles — guide goo balls into the goal using drawn shapes and spawned objects. Fewer drawings = more stars.🎨 Free ModeNo rules, no objectives — draw anything, spawn anything, and experiment with physics freely.

Spawnable Objects
ObjectIconDescriptionBall⚽Bouncy circle that rolls and collides naturallyBox📦Heavy square block — great for stacking and redirectingDog🐕A roaming companion that walks and randomly jumpsGoo🟢Squishy blob of spring-connected ballsRope🪢Click and drag to endpoint and release to hang a ropeChain⛓️Same as rope but rendered with a rigid chain appearanceBomb💣Explodes after 2 seconds — launches nearby objects flyingStar⭐Collectible item — collect all to win in Level Mode

Tools
ToolIconDescriptionDraw✏️Click and drag to draw freehand crayon lines on the canvasDrag✋Click and drag any physics object to reposition itErase🗑️Click on any drawn line or spawned object to remove itFreeze❄️Click any object to freeze it in place (or unfreeze it)

Level List
#Level NameObjective1Drop the ball!Guide the ball into the glass2Protect the star!Collect all 3 stars3Land safely!Land the ball on the green pad4Domino EffectTopple dominoes to push the ball to the goal5Goo Madness!Fill the glass with goo blobs6Rube GoldbergDraw ramps to guide 2 balls into the goal7Zero Gravity?!Navigate the ball without gravity8Star CollectorCollect all 5 stars with a single ball

Scoring: Clearing a level with 5 or fewer drawings earns ⭐⭐⭐. Under 10 earns ⭐⭐. More than 20 earns ⭐.


Code Structure
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
File / SectionDescriptionindex.htmlLanding screen, instructions overlay, top bar, spawn toolbar, win overlay, canvasgame.jsLevel definitions, physics constants, game loop, platform and goal renderingobject.jsGooBall — animated goo with eyes, wobble, squish; DrawnShape — crayon multi-layer textureeffects.jsParticle class with circle/star/square shapes; spawnParticles() and spawnCelebration()sounds.jsplaySound() with cooldown and pitch randomization; startMusic(), fadeOutMusic()script.jsPointer events, tool switching, draw preview, startLevel(), showWin(), HUD syncstyle.cssParchment theme, landing card animation, menu buttons, tool bar, responsive layout

Screenshots



Notes

Best experienced on desktop
Requires a modern browser — Chrome, Edge, or Firefox recommended
Sound may require a user interaction (click) before playing due to browser autoplay policies

Made with 💛 for Prog2 — 9338-AY225