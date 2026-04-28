const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const menu = document.getElementById("menu");
const startBtn = document.getElementById("startBtn");

const uiBar = document.getElementById("uiBar");
const resetBtn = document.getElementById("resetBtn");
const infoText = document.getElementById("infoText");

const winScreen = document.getElementById("winScreen");
const restartBtn = document.getElementById("restartBtn");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let isGameRunning = false;
const MAX_OBJECTS = 50;

let isDrawing = false;
let currentPath = [];

// UI
function updateUI() {
    infoText.textContent = `Score: ${score} / ${TARGET_SCORE}`;
}

// Start
startBtn.onclick = () => {
    if (isGameRunning) return;

    isGameRunning = true;
    gameState = "playing";

    menu.style.display = "none";
    canvas.style.display = "block";
    uiBar.style.display = "flex";

    updateUI();
    startMusic(); // 🔊 start bg music
    loop();
};

// Reset
resetBtn.onclick = () => {
    objects = [];
    particles = [];
    score = 0;
    updateUI();
};

// Restart
restartBtn.onclick = () => {
    objects = [];
    particles = [];
    score = 0;
    gameState = "playing";
    winScreen.style.display = "none";
};

// Click spawn
canvas.onclick = (e) => {
    if (gameState !== "playing") return;
    if (objects.length >= MAX_OBJECTS) return;

    const rect = canvas.getBoundingClientRect();

    objects.push(new GameObject(
        e.clientX - rect.left,
        e.clientY - rect.top
    ));

    playSound("bounce"); // 🔊 feedback
};

// Draw system
canvas.onmousedown = () => {
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
    if (!isDrawing) return;
    isDrawing = false;

    if (currentPath.length > 2 && objects.length < MAX_OBJECTS) {
        objects.push(new DrawnObject(currentPath));
        playSound("bounce");
    }
};

// Loop
function loop() {
    updateGame();
    drawGame();
    requestAnimationFrame(loop);
}