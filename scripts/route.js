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
  if (e.target.tagName === "A") {
    route(e);
  }
  e.preventDefault();
});

const route = (e) => {
  window.history.pushState({}, "", e.target.href);
  handleLocation();
};

const handleLocation = async () => {
  const path = "https://tatarjesus.github.io" + window.location.pathname;
  console.log(path);
  if (path !== "https://tatarjesus.github.io/WB-test-project/") {
    console.log("tut");
    document.innerHTML = await fetch(routers_full[path]).then((data) =>
      data.text()
    );
    // switch (path) {
    //   case "https://tatarjesus.github.io/WB-test-project/time":
    // }
  } else {
    document.innerHTML = await fetch(
      routers["https://tatarjesus.github.io/WB-test-project/"]
    ).then((data) => data.text());
  }
  // document.innerHTML = await fetch(
  //   routers["https://tatarjesus.github.io/WB-test-project/"]
  // ).then((data) => data.text());
  const html = await fetch(routers[path]).then((data) => data.text());
  console.log(html);
  document.querySelector(".container").innerHTML = html;
};

window.onpopstate = handleLocation;
window.route = route;
handleLocation();
