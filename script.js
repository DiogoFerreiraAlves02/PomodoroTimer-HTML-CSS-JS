const circularProgressBar = document.getElementById("circularProgressBar");
const circularProgressBarNumber = document.querySelector(".progress-value");
const btnPomodoro = document.getElementById("btn-pomodoro");
const btnShortBreak = document.getElementById("btn-short-break");
const btnLongBreak = document.getElementById("btn-long-break");

const audio = new Audio("assets/alarm.mp3");

const pomodoroTimerInSeconds = 1500; //60 sec * 25 min
const shortBreakTimerInSeconds = 300; //60 sec * 5 min
const longBreakTimerInSeconds = 900; //60 sec * 15 min

const TIMER_TYPE_POMODORO = "POMODORO";
const TIMER_TYPE_SHORT_BREAK = 'SHORTBREAK';
const TIMER_TYPE_LONG_BREAK = 'LONGBREAK';

let progressInterval; //to save setInterval
let pomodoroType = TIMER_TYPE_POMODORO;
let timerValue = pomodoroTimerInSeconds;
let multiplierFactor = 360 / timerValue;

//seconds to MM:SS 
function formatMinute(number){
    const minutes = Math.trunc(number / 60).toString().padStart(2,'0');
    const seconds = Math.trunc(number % 60).toString().padStart(2,'0');
    return `${minutes}:${seconds}`;
}

const startTimer = () =>{
    progressInterval = setInterval(() => {
        timerValue --;
        setInfoCircularProgressBar();
    }, 1000);
}

const stopTimer = () => clearInterval(progressInterval);

const resetTimer = () => {
    clearInterval(progressInterval);

    if(pomodoroType === TIMER_TYPE_POMODORO) timerValue = pomodoroTimerInSeconds;
    else if(pomodoroType === TIMER_TYPE_SHORT_BREAK) timerValue = shortBreakTimerInSeconds;
    else timerValue = longBreakTimerInSeconds;

    multiplierFactor = 360 / timerValue;
    setInfoCircularProgressBar();
    audio.stop();
}

function setInfoCircularProgressBar(){
    if(timerValue === 0){
        stopTimer();
        audio.play();
    }
    circularProgressBarNumber.textContent = `${formatMinute(timerValue)}`;
    circularProgressBar.style.background = `conic-gradient(var(--blue) ${timerValue * multiplierFactor}deg, var(--purple) 0deg)`;
}

const setPomodoroType = (type) => {
    pomodoroType = type;
    if(pomodoroType === TIMER_TYPE_POMODORO) {
        btnShortBreak.classList.remove("active");
        btnLongBreak.classList.remove("active");
        btnPomodoro.classList.add("active");
    }
    else if(pomodoroType === TIMER_TYPE_SHORT_BREAK) {
        btnPomodoro.classList.remove("active");
        btnLongBreak.classList.remove("active");
        btnShortBreak.classList.add("active");
    }
    else {
        btnPomodoro.classList.remove("active");
        btnShortBreak.classList.remove("active");
        btnLongBreak.classList.add("active");
    }

    resetTimer();
}