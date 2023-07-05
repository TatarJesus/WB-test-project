let seconds = 0;
let minutes = 0;
let hours = 0;
let interval;
let time = new Date();

const updateTime = () => {
  seconds++;
  if (seconds === 60) {
    minutes++;
    seconds = 0;
  }
  if (minutes === 60) {
    hours++;
    minutes = 0;
  }
  if (window.location.pathname === "/WB-test-project/time" || window.location.pathname === "/WB-test-project/time/") {
    let timer = document.getElementById("timer");
    let now = new Date().getTime();
    let sec = Math.floor((now - time) / 1000);
    let hhmmss = new Date(sec * 1000).toISOString().substr(11, 8);
    if (hhmmss.indexOf("00:") === 0) timer.textContent = hhmmss.substr(0);
    else timer.textContent = hhmmss;
    // timer.textContent = hhmmss.indexOf("00:") === 0 ? hhmmss.substr(0) : hhmmss
    // timer.textContent = `${hours.toString().padStart(2, "0")}:${minutes
    //   .toString()
    //   .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
};

const updateUserTime = () => {
  seconds = 0;
  minutes = 0;
  hours = 0;
};

interval = setInterval(updateTime, 1000);
