/*
=====================================================
🎮 Physics Sandbox Game
📘 Programming 2 Final Project

📌 Description:
Contains the main game loop, physics system,
UI handling, and rendering logic.
=====================================================
*/

// Get elements
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const menu = document.getElementById("menu");
const startBtn = document.getElementById("startBtn");

// 🆕 UI elements
const uiBar = document.getElementById("uiBar");
const resetBtn = document.getElementById("resetBtn");

// Canvas setup
canvas.width = 800;
canvas.height = 500;

// Game state
let gameState = "menu";

// Object storage
let objects = [];

// Physics
const GRAVITY = 0.5;
const ground = canvas.height;

// Object class
class GameObject {
    constructor(x, y, size = 30) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.velocityY = 0;

        // Random color
        this.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
    }

    update() {
        this.velocityY += GRAVITY;
        this.y += this.velocityY;

        // Ground collision with bounce
        if (this.y + this.size > ground) {
            this.y = ground - this.size;
            this.velocityY *= -0.4;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

// Start game
startBtn.addEventListener("click", () => {
    gameState = "playing";

    menu.style.display = "none";
    canvas.style.display = "block";

    // Show UI bar
    uiBar.style.display = "flex";

    startGame();
});

// 🆕 Reset button
resetBtn.addEventListener("click", () => {
    objects = [];
});

// Mouse input
canvas.addEventListener("click", (e) => {
    if (gameState !== "playing") return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    objects.push(new GameObject(x, y));
});

// Start function
function startGame() {
    requestAnimationFrame(gameLoop);
}

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Update logic
function update() {
    if (gameState !== "playing") return;

    objects.forEach(obj => obj.update());
}

// Draw function
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState === "playing") {
        objects.forEach(obj => obj.draw());

        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.fillText("Day 8: UI + Reset system", 280, 30);
    }
}