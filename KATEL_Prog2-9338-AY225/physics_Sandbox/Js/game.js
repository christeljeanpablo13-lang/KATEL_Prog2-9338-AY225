let objects = [];
let particles = [];

let score = 0;
const TARGET_SCORE = 3;

const GRAVITY = 0.5;
const ground = 500;

let gameState = "menu";

const goal = {
    x: 650,
    y: 450,
    width: 120,
    height: 20,
    glow: 0
};

function updateGame() {
    if (gameState !== "playing") return;

    objects.forEach(o => o.update());

    particles = particles.filter(p => p.life > 0);
    particles.forEach(p => p.update());

    if (goal.glow > 0) goal.glow--;
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw existing objects
    objects.forEach(o => o.draw(ctx));

    // 🖊️ DRAW PREVIEW (NEW)
    if (isDrawing && currentPath.length > 1) {
        ctx.beginPath();
        ctx.moveTo(currentPath[0].x, currentPath[0].y);

        for (let i = 1; i < currentPath.length; i++) {
            ctx.lineTo(currentPath[i].x, currentPath[i].y);
        }

        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}