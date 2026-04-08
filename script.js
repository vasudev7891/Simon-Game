let gameSeq = [];
let userSeq = [];
let highScore = 0;
let highScoreDisplay = document.querySelector("#high-score");

let btns = ["red", "yellow", "green", "blue"];

let isStarted = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
    if(isStarted == false) {
        isStarted = true;

        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("gameFlash");

    setTimeout(() => {
        btn.classList.remove("gameFlash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");

    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);

    gameFlash(randBtn);
}

function checkAns(idx) {
    if(gameSeq[idx] === userSeq[idx]) {

        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 600);
        }    

    } else {
        if(level > highScore) {
            highScore = level;
            highScoreDisplay.innerText = highScore;
        }
        
        h2.innerHTML = `Game Over! Your Score is <b>${level}</b>.<br>Press any key to Start Again.`;
        document.querySelector("body").style.backgroundColor = "red";
        
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);

        resetGame();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function resetGame() {
    isStarted = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}