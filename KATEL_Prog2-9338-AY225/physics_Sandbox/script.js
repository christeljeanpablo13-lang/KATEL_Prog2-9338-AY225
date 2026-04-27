/*
=====================================================
🎮 Physics Sandbox Game
📘 Programming 2 Final Project

📌 Description:
Contains the main game loop, state management,
and rendering logic.
=====================================================
*/

// Get elements
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const menu = document.getElementById("menu");
const startBtn = document.getElementById("startBtn");

// Canvas setup
canvas.width = 800;
canvas.height = 500;

// Game state
let gameState = "menu"; // menu | playing

// Object storage
let objects = [];

// 🆕 DAY 5: Gravity constant
const GRAVITY = 0.5;

// Object class
class GameObject {
    constructor(x, y, size = 30) {
        this.x = x;
        this.y = y;
        this.size = size;

        // 🆕 velocity for movement
        this.velocityY = 0;
    }

    // 🆕 update movement
    update() {
        this.velocityY += GRAVITY;
        this.y += this.velocityY;
    }

    draw() {
        ctx.fillStyle = "cyan";
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

// Start game
startBtn.addEventListener("click", () => {
    gameState = "playing";

    menu.style.display = "none";
    canvas.style.display = "block";

    startGame();
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

    // 🆕 apply physics
    objects.forEach(obj => obj.update());
}

// Draw function
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState === "playing") {
        drawGame();
    }
}

// Draw game elements
function drawGame() {
    objects.forEach(obj => obj.draw());

    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText("Day 5: Gravity applied", 300, 30);
}