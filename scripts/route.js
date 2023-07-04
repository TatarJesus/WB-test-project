const home_path = '/WB-test-project';

const routers = {
  "/": "../index.html",
  "/activity": "../pages/Activity.html",
  "/map": "../pages/Map.html",
  "/time": "../pages/Time.html",
  "/activity/": "../pages/Activity.html",
  "/map/": "../pages/Map.html",
  "/time/": "../Time.html",
};

const routers_full = {
  "/activity/": "../index.html",
  "/map/": "../index.html",
  "/time/": "../index.html",
};

document.addEventListener("click", (e) => {
  console.log("e.target", e.target);
  console.log("this", this);
  if (e.target.classList.contains("link_internal")) {
    route(e);
  }
  e.preventDefault();
});

const route = (e) => {
  console.log("e.target.href", e.target.href);
  const href = e.target.href;
  const pathE = window.location.origin + home_path + href.slice(href.lastIndexOf(), href.length - 1);
  console.log(pathE)
  if (pathE !== window.location.pathname) {
    window.history.pushState({}, "", pathE);
    handleLocation();
  }
};

const handleLocation = async () => {
  const path = window.location.pathname;
  if (home_path + path !== "/WB-test-project/") {
    document.innerHTML = await fetch(window.location.origin + routers_full[path]).then((data) =>
      data.text()
    );
  } else {
    document.innerHTML = await fetch(routers["/"]).then((data) => data.text());
  }
  const html = await fetch(routers[path]).then((data) => data.text());
  document.querySelector(".container").innerHTML = html;
};

window.onpopstate = handleLocation;
window.route = route;
handleLocation();
