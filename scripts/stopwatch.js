let seconds = 0;
let minutes = 0;
let hours = 0;
let interval;

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
  console.log(window.location.pathname);
  if (window.location.pathname === "/WB-test-project/time" || window.location.pathname === "/WB-test-project/time/") {
    let timer = document.getElementById("timer");
    timer.textContent = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
};

const updateUserTime = () => {
  seconds = 0;
  minutes = 0;
  hours = 0;
};

interval = setInterval(updateTime, 1000);
