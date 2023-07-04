const home_path = '/WB-test-project';
let current_href = '';

const routers = {
  "/": "/index.html",
  "/activity": "/pages/Activity.html",
  "/map": "/pages/Map.html",
  "/time": "/pages/Time.html",
  // "/activity/": "/pages/Activity.html",
  // "/map/": "/pages/Map.html",
  // "/time/": "/pages/Time.html",
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

const route = (e) => {
  const href = e.target.href;
  current_href = window.location.origin + home_path + href.slice(href.lastIndexOf('/'), href.length);
  console.log(current_href)
  if (current_href !== window.location.href) {
    window.history.pushState({}, "", current_href);
    handleLocation();
  }
};

const handleLocation = async () => {
  // const path = window.location.pathname;
  const path = current_href.slice(current_href.lastIndexOf('/'), current_href.length);
  console.log('path', path)
  if (routers_full.hasOwnProperty(path)) {
    console.log('routers_full[path]', routers_full[path])
    console.log('log', window.location.origin + home_path + routers_full[path]);
    document.innerHTML = await fetch(window.location.origin + home_path + routers_full[path]).then((data) =>
      data.text()
    );
  } else {
    console.log('log', window.location.origin + home_path + routers[path]);
    document.innerHTML = await fetch(window.location.origin + home_path + routers["/"]).then((data) => data.text());
  }
  const html = await fetch(window.location.origin + home_path + routers[path]).then((data) => data.text());
  document.querySelector(".container").innerHTML = html;
};

window.onpopstate = handleLocation;
window.route = route;
handleLocation();
