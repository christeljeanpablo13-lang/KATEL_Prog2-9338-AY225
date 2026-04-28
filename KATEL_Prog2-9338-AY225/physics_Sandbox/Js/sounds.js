const sounds = {
    bounce: new Audio("assets/sounds/bounce.mp3"),
    score: new Audio("assets/sounds/score.mp3"),
    win: new Audio("assets/sounds/win.mp3")
};

function playSound(name) {
    if (sounds[name]) {
        sounds[name].currentTime = 0;
        sounds[name].play();
    }
}