const home_path = "WB-test-project";
let current_href = "";
const pageName = window.location.pathname.replaceAll("/", "");

const routers = {
  "/": "/index.html",
  "/activity": "/pages/Activity.html",
  "/map": "/pages/Map.html",
  "/time": "/pages/Time.html",
};

const routers_full = {
  "/activity/": "/activity/index.html",
  "/map/": "/map/index.html",
  "/time/": "/time/index.html",
};

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("link_internal")) {
    route(e.target.href);
  } else if (e.target.parentElement.classList.contains("left-buts-elem")) {
    route(e.target.parentElement.href);
  }
  e.preventDefault();
});

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

const changeActiveLink = () => {
  const prevActiveBtn = document.querySelector(".active");
  if (!prevActiveBtn) prevActiveBtn.classList.remove("active");
  const curActiveBtn = document.querySelector(pageName.replace(home_path, ""));
  curActiveBtn.classList.add("active");
};

const route = (href) => {
  const path = href.replaceAll("/", "");
  if (path !== pageName) {
    window.history.pushState({}, "", current_href);
    handleLocation();
    changeActiveLink();
  }
};

const handleLocation = async () => {
  let path = current_href.replace(window.location.origin + "/" + home_path, "");
  let html = "";
  document.innerHTML = await fetch(
    window.location.origin + home_path + routers["/"]
  ).then((data) => data.text());
  html = await fetch(window.location.origin + home_path + routers[path]).then(
    (data) => data.text()
  );
  document.querySelector(".container").innerHTML = html;
  if (path.includes("map")) readyMap();
  updateTime();
};

window.onpopstate = handleLocation;
window.route = route;
handleLocation();
