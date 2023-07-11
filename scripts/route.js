const pageName = window.location.pathname.split('/')[2];
const btns = document.querySelectorAll('.link_internal');

const routers = {
  'activity': "./pages/Activity.html",
  'map': "./pages/Map.html",
  'time': "./pages/Time.html",
};

for (const btn of btns) {
  btn.addEventListener('click', (e) => {
    route(this.document.activeElement.pathname);
    e.preventDefault();
  });
}

// document.addEventListener("click", (e) => {
//   if (e.target.classList.contains("link_internal")) {
//     route(e.target.href);
//   } else if (e.target.parentElement.classList.contains("left-buts-elem")) {
//     route(e.target.parentElement.href);
//   }
//   e.preventDefault();
// });

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
  const curActiveBtn = document.querySelector('.' + path);
  curActiveBtn.classList.add("active");
};

const route = (href) => {
  const path = href.split('/')[2];
  if (path !== pageName) {
    window.history.pushState({}, "", path);
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

window.onpopstate = handleLocation;
window.route = route;
handleLocation();
