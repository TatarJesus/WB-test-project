const pageName = window.location.pathname.split("/")[2];
const btns = document.querySelectorAll(".link_internal");

const routers = {
  activity: "./pages/Activity.html",
  map: "./pages/Map.html",
  time: "./pages/Time.html",
};

for (const btn of btns) {
  btn.addEventListener("click", (e) => {
    route(btn.href);
    e.preventDefault();
  });
}

const ready = () => {
  let curPage = '';
  (pageName === "" && window.history.length === 0) ? curPage = "activity" : curPage = document.cookie.match(/pageName=(.+?)(;|$)/)[1];
  window.history.replaceState(curPage, "", curPage);
  handleLocation(curPage);
  changeActiveLink(curPage);
};

document.addEventListener("DOMContentLoaded", ready);

const readyMap = () => {
  document.querySelector(".map-g").innerHTML = "";
  ymaps.ready(init);
  function init() {
    var myMap = new ymaps.Map("map", {
      center: [55.76, 37.64],
      zoom: 7,
    });
  }
};

const changeActiveLink = (path) => {
  const prevActiveBtn = document.querySelector(".active");
  if (prevActiveBtn) prevActiveBtn.classList.remove("active");
  const curActiveBtn = document.querySelector("." + path);
  curActiveBtn.classList.add("active");
};

const route = (href) => {
  const path = href.split("/")[2];
  if (path !== pageName) {
    window.history.pushState(path, "", path);
    handleLocation(path);
    changeActiveLink(path);
  }
};

const handleLocation = async (path) => {
  const html = await fetch(routers[path]).then((data) => data.text());
  document.querySelector(".container").innerHTML = html;
  if (path === "map") readyMap();
  updateTime();
};

const handleLocationPopState = async (path) => {
  const html = await fetch(routers[path.state]).then((data) => data.text());
  document.querySelector(".container").innerHTML = html;
  if (path.state === "map") readyMap();
  updateTime();
};


window.onpopstate = handleLocationPopState;
window.route = route;
