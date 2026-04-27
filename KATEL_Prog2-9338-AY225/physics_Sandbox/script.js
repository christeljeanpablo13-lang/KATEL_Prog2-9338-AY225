/*
=====================================================
🎮 Physics Sandbox Game
📘 Programming 2 Final Project
=====================================================
*/

// Elements
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const menu = document.getElementById("menu");
const startBtn = document.getElementById("startBtn");

const uiBar = document.getElementById("uiBar");
const resetBtn = document.getElementById("resetBtn");

const winScreen = document.getElementById("winScreen");
const restartBtn = document.getElementById("restartBtn");

// Canvas
canvas.width = 800;
canvas.height = 500;

// Game state
let gameState = "menu"; // menu | playing | win

// Objects
let objects = [];

// Physics
const GRAVITY = 0.5;
const ground = canvas.height;

// 🆕 Goal zone
const goal = {
    x: 650,
    y: 450,
    width: 120,
    height: 20
};

// Class
class GameObject {
    constructor(x, y, size = 30) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.velocityY = 0;
        this.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
    }

    update() {
        this.velocityY += GRAVITY;
        this.y += this.velocityY;

        // ground collision
        if (this.y + this.size > ground) {
            this.y = ground - this.size;
            this.velocityY *= -0.4;
        }

        // 🆕 CHECK GOAL COLLISION
        if (
            this.x < goal.x + goal.width &&
            this.x + this.size > goal.x &&
            this.y < goal.y + goal.height &&
            this.y + this.size > goal.y
        ) {
            gameState = "win";
            winScreen.style.display = "block";
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
    uiBar.style.display = "flex";

    startGame();
});

// Reset
resetBtn.addEventListener("click", () => {
    objects = [];
});

// Restart
restartBtn.addEventListener("click", () => {
    objects = [];
    gameState = "playing";
    winScreen.style.display = "none";
});

// Spawn objects
canvas.addEventListener("click", (e) => {
    if (gameState !== "playing") return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    objects.push(new GameObject(x, y));
});

// Game loop
function startGame() {
    requestAnimationFrame(loop);
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}

function update() {
    if (gameState !== "playing") return;

    objects.forEach(obj => obj.update());
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState === "playing") {

        // Draw goal zone
        ctx.fillStyle = "#22c55e";
        ctx.fillRect(goal.x, goal.y, goal.width, goal.height);

        objects.forEach(obj => obj.draw());

        ctx.fillStyle = "white";
        ctx.fillText("Day 9: Reach the green zone!", 270, 30);
    }
}