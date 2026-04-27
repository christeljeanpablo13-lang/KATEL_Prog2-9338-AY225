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
const infoText = document.getElementById("infoText");

const winScreen = document.getElementById("winScreen");
const restartBtn = document.getElementById("restartBtn");

// Canvas
canvas.width = 800;
canvas.height = 500;

// State
let gameState = "menu";

// Objects
let objects = [];
let particles = [];

// Score
let score = 0;
const TARGET_SCORE = 3;

// Physics
const GRAVITY = 0.5;
const ground = canvas.height;

// Goal
const goal = {
    x: 650,
    y: 450,
    width: 120,
    height: 20,
    glow: 0
};

// Particle class
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 2;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 1) * 4;
        this.life = 30;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
    }

    draw() {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

// Object class
class GameObject {
    constructor(x, y, size = 30) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.velocityY = 0;
        this.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
        this.scored = false;
    }

    update() {
        this.velocityY += GRAVITY;
        this.y += this.velocityY;

        if (this.y + this.size > ground) {
            this.y = ground - this.size;
            this.velocityY *= -0.4;
        }

        // Goal detection
        if (
            !this.scored &&
            this.x < goal.x + goal.width &&
            this.x + this.size > goal.x &&
            this.y < goal.y + goal.height &&
            this.y + this.size > goal.y
        ) {
            this.scored = true;
            score++;
            goal.glow = 10;

            // 🆕 spawn particles
            for (let i = 0; i < 10; i++) {
                particles.push(new Particle(this.x, this.y));
            }

            updateUI();

            if (score >= TARGET_SCORE) {
                gameState = "win";
                winScreen.style.display = "block";
            }
        }
    }

    draw() {
        // Shadow
        ctx.fillStyle = "rgba(0,0,0,0.3)";
        ctx.fillRect(this.x + 3, this.y + 3, this.size, this.size);

        // Object
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

// UI update
function updateUI() {
    infoText.textContent = `Score: ${score} / ${TARGET_SCORE}`;
}

// Start
startBtn.addEventListener("click", () => {
    gameState = "playing";

    menu.style.display = "none";
    canvas.style.display = "block";
    uiBar.style.display = "flex";

    updateUI();
    startGame();
});

// Reset
resetBtn.addEventListener("click", () => {
    objects = [];
    particles = [];
    score = 0;
    updateUI();
});

// Restart
restartBtn.addEventListener("click", () => {
    objects = [];
    particles = [];
    score = 0;
    gameState = "playing";
    winScreen.style.display = "none";
    updateUI();
});

// Spawn
canvas.addEventListener("click", (e) => {
    if (gameState !== "playing") return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    objects.push(new GameObject(x, y));
});

// Loop
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

    // Update particles
    particles = particles.filter(p => p.life > 0);
    particles.forEach(p => p.update());

    // Reduce glow
    if (goal.glow > 0) goal.glow--;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState === "playing") {

        // Background grid
        ctx.strokeStyle = "rgba(255,255,255,0.05)";
        for (let i = 0; i < canvas.width; i += 40) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
        }

        // Goal with glow
        ctx.fillStyle = "#22c55e";
        ctx.fillRect(goal.x, goal.y, goal.width, goal.height);

        if (goal.glow > 0) {
            ctx.fillStyle = "rgba(34,197,94,0.3)";
            ctx.fillRect(goal.x - 5, goal.y - 5, goal.width + 10, goal.height + 10);
        }

        objects.forEach(obj => obj.draw());
        particles.forEach(p => p.draw());

        ctx.fillStyle = "white";
        ctx.fillText("Day 11: Visual polish + effects", 260, 30);
    }
}