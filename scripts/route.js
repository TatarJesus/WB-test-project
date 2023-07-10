const pageName = window.location.pathname.split('/')[2];
const btns = document.querySelectorAll('.link_internal');

const routers = {
  'activity': "/pages/Activity.html",
  'map': "/pages/Map.html",
  'time': "/pages/Time.html",
};

for (const btn of btns) {
  btn.addEventListener('click', (e) => {
    console.log(this);
    route(e.target.href);
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

const changeActiveLink = () => {
  const prevActiveBtn = document.querySelector(".active");
  if (prevActiveBtn) prevActiveBtn.classList.remove("active");

  const curActiveBtn = document.querySelector('.' + pageName);
  curActiveBtn.classList.add("active");
};

const route = (href) => {
  const path = href.replaceAll("/", "");
  if (path !== pageName) {
    window.history.pushState({}, "", pageName);
    handleLocation();
    changeActiveLink();
  }
};

const handleLocation = async () => {
  const html = await fetch(routers[pageName]).then((data) => data.text());
  document.querySelector(".container").innerHTML = html;
  if (pageName === "map") readyMap();
  updateTime();
};

window.onpopstate = handleLocation;
window.route = route;
handleLocation();
