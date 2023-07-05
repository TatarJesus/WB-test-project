const home_path = "/WB-test-project";
let current_href = "";

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
    route(e);
  }
  e.preventDefault();
});

const readyMap = () => {
  document.querySelector(".map-g").innerHTML = '';
  ymaps.ready(init);
  function init() {
    var myMap = new ymaps.Map("map", {
      center: [55.76, 37.64],
      zoom: 7,
    });
  }
};

const add_active_ref = () => {
  const path = current_href.replace(window.location.origin + home_path, "");
  const btn = document.querySelector('.' + path.replaceAll('/', ''));
  btn.classList.add('active');
}

const del_active_ref = () => {
  const path = current_href.replace(window.location.origin + home_path, "");
  const btn = document.querySelector('.' + path.replaceAll('/', ''));
  btn.classList.del('active');
}

const route = (e) => {
  const href = e.target.href;
  del_active_ref();
  current_href =
    window.location.origin +
    home_path +
    href.slice(href.lastIndexOf("/"), href.length);
  add_active_ref();
    if (
    current_href !== window.location.href &&
    current_href + "/" !== window.location.href
  ) {
    window.history.pushState({}, "", current_href);
    handleLocation();
  }
};

const handleLocation = async () => {
  if (current_href === "") {
    current_href = window.location.href;
    add_active_ref();
  }
    const path = current_href.replace(window.location.origin + home_path, "");
  let html = "";
  if (routers_full.hasOwnProperty(path)) {
    document.innerHTML = await fetch(
      window.location.origin + home_path + routers_full[path]
    ).then((data) => data.text());
    if (path.includes('map')) readyMap();
  } else {
    document.innerHTML = await fetch(
      window.location.origin + home_path + routers["/"]
    ).then((data) => data.text());
    html = await fetch(window.location.origin + home_path + routers[path]).then(
      (data) => data.text()
    );
    document.querySelector(".container").innerHTML = html;
    if (path.includes('map')) readyMap();
  }
};

window.onpopstate = handleLocation;
window.route = route;
handleLocation();
