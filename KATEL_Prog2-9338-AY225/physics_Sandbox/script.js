/*
=====================================================
🎮 Physics Sandbox Game
📘 Programming 2 Final Project

📌 Description:
Main controller file.
Handles UI, input, and game loop connection.
=====================================================
*/

// =========================
// ELEMENTS
// =========================
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const menu = document.getElementById("menu");
const startBtn = document.getElementById("startBtn");

const uiBar = document.getElementById("uiBar");
const resetBtn = document.getElementById("resetBtn");
const infoText = document.getElementById("infoText");

const winScreen = document.getElementById("winScreen");
const restartBtn = document.getElementById("restartBtn");

// =========================
// CANVAS SETUP
// =========================
canvas.width = 800;
canvas.height = 500;

// =========================
// UI UPDATE
// =========================
function updateUI() {
    infoText.textContent = `Score: ${score} / ${TARGET_SCORE}`;
}

// =========================
// START GAME
// =========================
startBtn.addEventListener("click", () => {
    gameState = "playing";

    menu.style.display = "none";
    canvas.style.display = "block";
    uiBar.style.display = "flex";

    updateUI();
    startGameLoop();
});

// =========================
// RESET GAME
// =========================
resetBtn.addEventListener("click", () => {
    objects = [];
    particles = [];
    score = 0;

    updateUI();
});

// =========================
// RESTART AFTER WIN
// =========================
restartBtn.addEventListener("click", () => {
    objects = [];
    particles = [];
    score = 0;

    gameState = "playing";
    winScreen.style.display = "none";

    updateUI();
});

// =========================
// SPAWN OBJECTS
// =========================
canvas.addEventListener("click", (e) => {
    if (gameState !== "playing") return;

    const rect = canvas.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    objects.push(new GameObject(x, y));
});

// =========================
// GAME LOOP
// =========================
function startGameLoop() {
    requestAnimationFrame(gameLoop);
}

function gameLoop() {
    updateGame();
    drawGame();

    requestAnimationFrame(gameLoop);
}