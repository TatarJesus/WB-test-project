const routers = {
  "https://tatarjesus.github.io/WB-test-project/":
    "https://tatarjesus.github.io/WB-test-project/index.html",
  "https://tatarjesus.github.io/WB-test-project/activity":
    "https://tatarjesus.github.io/WB-test-project/pages/Activity.html",
  "https://tatarjesus.github.io/WB-test-project/map":
    "https://tatarjesus.github.io/WB-test-project/pages/Map.html",
  "https://tatarjesus.github.io/WB-test-project/time":
    "https://tatarjesus.github.io/WB-test-project/pages/Time.html",
  "https://tatarjesus.github.io/WB-test-project/activity/":
    "https://tatarjesus.github.io/WB-test-project/pages/Activity.html",
  "https://tatarjesus.github.io/WB-test-project/map/":
    "https://tatarjesus.github.io/WB-test-project/pages/Map.html",
  "https://tatarjesus.github.io/WB-test-project/time/":
    "https://tatarjesus.github.io/WB-test-project/pages/Time.html",
};

const routers_full = {
  "https://tatarjesus.github.io/WB-test-project/activity/":
    "https://tatarjesus.github.io/WB-test-project/index.html",
  "https://tatarjesus.github.io/WB-test-project/map/":
    "https://tatarjesus.github.io/WB-test-project/index.html",
  "https://tatarjesus.github.io/WB-test-project/time/":
    "https://tatarjesus.github.io/WB-test-project/index.html",
};

document.addEventListener("click", (e) => {
  console.log('e.target', e.target)
  if (e.target.tagName === "A") {
    route(e);
  }
  e.preventDefault();
});

const route = (e) => {
  console.log('e.target.href', e.target.href);
  if (e.target.href !== window.location.pathname){
    window.history.pushState({}, "", e.target.href);
    handleLocation();
  }
};

const handleLocation = async () => {
  const path = "https://tatarjesus.github.io" + window.location.pathname;
  if (path !== "https://tatarjesus.github.io/WB-test-project/") {
    document.innerHTML = await fetch(routers_full[path]).then((data) =>
      data.text()
    );
  } else {
    document.innerHTML = await fetch(
      routers["https://tatarjesus.github.io/WB-test-project/"]
    ).then((data) => data.text());
  }
  const html = await fetch(routers[path]).then((data) => data.text());
  document.querySelector(".container").innerHTML = html;
};

window.onpopstate = handleLocation;
window.route = route;
handleLocation();
