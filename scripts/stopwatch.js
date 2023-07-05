let interval;
let time = new Date().getTime();

const updateTime = () => {
  if (window.location.pathname === "/WB-test-project/time" || window.location.pathname === "/WB-test-project/time/") {
    let timer = document.getElementById("timer");
    let now = new Date().getTime();
    let sec = Math.floor((now - time) / 1000);
    let hhmmss = new Date(sec * 1000).toISOString().substr(11, 8);
    if (hhmmss.indexOf("00:") === 0) timer.textContent = hhmmss.substr(0);
    else timer.textContent = hhmmss;
  }
};

const updateUserTime = () => {
  time = new Date().getTime();
};

interval = setInterval(updateTime, 1000);
