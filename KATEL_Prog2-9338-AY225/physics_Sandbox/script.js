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

// 🖊️ DRAW SYSTEM
let isDrawing = false;
let currentPath = [];

// =========================
// UI UPDATE
// =========================
function updateUI() {
    infoText.textContent = `Score: ${score} / ${TARGET_SCORE}`;

    // ✨ visual feedback
    if (score > 0) {
        uiBar.style.boxShadow = "0 0 15px rgba(34,197,94,0.4)";
    } else {
        uiBar.style.boxShadow = "none";
    }
}

// =========================
// START GAME
// =========================
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

// =========================
// RESET
// =========================
resetBtn.onclick = () => {
    objects = [];
    particles = [];
    score = 0;
    updateUI();
};

// =========================
// RESTART (WIN)
// =========================
restartBtn.onclick = () => {
    objects = [];
    particles = [];
    score = 0;
    gameState = "playing";

    winScreen.style.display = "none";
    updateUI();
};

// =========================
// CLICK SPAWN (OLD SYSTEM)
// =========================
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

// =========================
// DRAW SYSTEM (CRAYON STYLE)
// =========================
canvas.onmousedown = (e) => {
    if (gameState !== "playing") return;

    isDrawing = true;
    currentPath = [];

    playSound("bounce"); // 🔊 feedback
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
    if (!isDrawing) return;

    isDrawing = false;

    if (currentPath.length > 2) {
        objects.push(new DrawnObject(currentPath));
    }
};

// =========================
// GAME LOOP
// =========================
function loop() {
    updateGame();
    drawGame();
    requestAnimationFrame(loop);
}