const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapTimesList = document.getElementById('lap-times');

let timerInterval;
let startTime;
let elapsedTime = 0;
let isPaused = false;

function updateDisplay() {
    const currentTime = new Date(elapsedTime);
    const hours = currentTime.getUTCHours().toString().padStart(2, '0');
    const minutes = currentTime.getUTCMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getUTCSeconds().toString().padStart(2, '0');
    const milliseconds = currentTime.getUTCMilliseconds().toString().padStart(3, '0');
    timeDisplay.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function startTimer() {
    if (!timerInterval) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10); 
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    updateDisplay();
    lapTimesList.innerHTML = '';
}

function lapTimer() {
    const lapTime = document.createElement('li');
    lapTime.textContent = timeDisplay.textContent;
    lapTimesList.appendChild(lapTime);
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', lapTimer);

updateDisplay();
