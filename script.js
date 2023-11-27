let field = document.querySelector('.field');
console.log(field);

let startAudio = new Audio('./audio/start.wav');
let newFieldAudio = new Audio('./audio/step.wav');
let endAudio = new Audio('./audio/end.wav');
let clickAudio = new Audio('./audio/capture.wav');

for (let i = 0; i < 4; i++) {
    field.innerHTML += '<div class="cell-line"></div>'
    let cellLine = field.querySelectorAll('.cell-line')[i];
    for (let n = 0; n < 4; n++) {
        cellLine.innerHTML += '<div class="cell" onmousedown="cellClicked(this)"></div>'
    }
}

let cells = document.querySelectorAll('.cell');

cells[0].style.cssText += 'border-radius: 10px 0 0 0';
cells[3].style.cssText += 'border-radius: 0 10px 0 0';
cells[12].style.cssText += 'border-radius: 0 0 0 10px';
cells[15].style.cssText += 'border-radius: 0 0 10px 0';

var score = 0;
let scoreTitle = document.querySelector('.score');
console.log(scoreTitle);
let intervalId;
let isStarted = false;
let activeCells = document.querySelectorAll('.active'); 

function startGame() {
    if (!isStarted) {
        startAudio.play();
        score = 0;
        let interval = 400;
        isStarted = true;
        let randomCell = Math.floor(Math.random() * 16);
        intervalId = setTimeout(function run() {   
            newFieldAudio.pause();
            randomCell = Math.floor(Math.random() * 16);
            if (activeCells.length == 16) {
                endGame();
                return;
            }  
            while (cells[randomCell].classList.contains('active')) {
                randomCell = Math.floor(Math.random() * 16);
            }  
            cells[randomCell].classList.add('active');
            newFieldAudio.play();
            interval -= 10;
            if (interval == 160) interval += 90;
            activeCells = document.querySelectorAll('.active'); 
            intervalId = setTimeout(run, interval);
        }, interval);
    }
    
}

function clearField() {
    activeCells.forEach((elem) => elem.classList.remove('active'));
    activeCells = document.querySelectorAll('.active'); 
}

function endGame() {
    endAudio.play();
    clearTimeout(intervalId);
    isStarted = false;
    clearField();
}

function cellClicked(elem) {
    if (isStarted == true) {
        if (elem.classList.contains('active')) 
        { 
            clickAudio.play();
            elem.classList.remove('active');
            updateScore();
        }
        else {
            endGame();
        }
    }  
}

function updateScore() {
    score++;
    scoreTitle.innerHTML = `Score: ${score}`;
}
// hui
