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
// DAY 2 - Object storage (array)
let placedObjects = []

// Start game
startBtn.addEventListener("click", () => {
    gameState = "playing";

    menu.style.display = "none";
    canvas.style.display = "block";

    startGame();
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

    // Future physics updates here
}

// Draw function
function draw() {
    // Clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gameState === "playing") {
        drawGame();
    }
}

function drawGame() {
    // Draw placed objects
    placedObjects.forEach(obj => {
        ctx.fillStyle = "#3b82f6";
        ctx.fillRect(obj.x - 20, obj.y - 20, obj.width, obj.height);
    });

    // Text
    ctx.fillStyle = "white";
    ctx.font = "16px Arial";
    ctx.fillText("Click to place objects", 20, 30);
}

// DAY 2 - Create object
function createObject(x, y) {
    return {
        x: x,
        y: y,
        width: 40,
        height: 40
    };
}

// DAY 2 - Mouse click to place object
canvas.addEventListener("click", (event) => {
    if (gameState !== "playing") return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const newObject = createObject(mouseX, mouseY);
    placedObjects.push(newObject);
});