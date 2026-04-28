const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const menu = document.getElementById("menu");
const startBtn = document.getElementById("startBtn");

const uiBar = document.getElementById("uiBar");
const resetBtn = document.getElementById("resetBtn");
const infoText = document.getElementById("infoText");

const winScreen = document.getElementById("winScreen");
const restartBtn = document.getElementById("restartBtn");

canvas.width = 800;
canvas.height = 500;

// 🆕 GAME CONTROL
let isGameRunning = false;

// 🆕 LIMITS
const MAX_OBJECTS = 50;
let lastSpawnTime = 0;
const SPAWN_DELAY = 100;

// UI
function updateUI() {
    infoText.textContent = `Score: ${score} / ${TARGET_SCORE}`;
}

// START
startBtn.onclick = () => {
    if (isGameRunning) return;

    isGameRunning = true;
    gameState = "playing";

    menu.style.display = "none";
    canvas.style.display = "block";
    uiBar.style.display = "flex";

    updateUI();
    loop();
};

// RESET
resetBtn.onclick = () => {
    objects = [];
    particles = [];
    score = 0;
    updateUI();
};

// RESTART
startBtn.onclick = () => {
    if (isGameRunning) return;

    isGameRunning = true;
    gameState = "playing";

    menu.style.display = "none";
    canvas.style.display = "block";
    uiBar.style.display = "flex";

    updateUI();

    requestAnimationFrame(loop);
};

// SPAWN
canvas.onclick = (e) => {
    if (gameState !== "playing") return;

    const now = Date.now();
    if (now - lastSpawnTime < SPAWN_DELAY) return;
    if (objects.length >= MAX_OBJECTS) return;

    lastSpawnTime = now;

    const rect = canvas.getBoundingClientRect();

    objects.push(new GameObject(
        e.clientX - rect.left,
        e.clientY - rect.top
    ));
};

// LOOP
function loop() {
    updateGame();
    drawGame();
    requestAnimationFrame(loop);
}
let isDrawing = false;
let currentPath = [];

canvas.onmousedown = (e) => {
    if (gameState !== "playing") return;

    isDrawing = true;
    currentPath = [];
};

canvas.onmousemove = (e) => {
    if (!isDrawing) return;

    const rect = canvas.getBoundingClientRect();

    currentPath.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    });
};

canvas.onmouseup = () => {
    isDrawing = false;
};