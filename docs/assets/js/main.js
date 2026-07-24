// PriceCalc Pro — lightweight progressive enhancement.
(function () {
  "use strict";

  // Mobile navigation toggle
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Current year in footer
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();

  // Pause the hero video when off-screen to save resources
  var vid = document.querySelector(".hero-media video");
  if (vid && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { vid.play().catch(function () {}); }
        else { vid.pause(); }
      });
    }, { threshold: 0.15 });
    io.observe(vid);
  }
})();
