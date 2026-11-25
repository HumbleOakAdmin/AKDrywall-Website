(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  document.documentElement.classList.add("motion");

  document.querySelectorAll("[data-lottie]").forEach(function (el) {
    if (!window.lottie) return;
    window.lottie.loadAnimation({
      container: el,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: el.getAttribute("data-lottie"),
      rendererSettings: { preserveAspectRatio: "xMidYMid meet" }
    });
  });

  var items = document.querySelectorAll(".reveal");
  items.forEach(function (el) {
    var siblings = Array.prototype.filter.call(el.parentElement.children, function (node) {
      return node.classList && node.classList.contains("reveal");
    });
    var index = siblings.indexOf(el);
    el.style.transitionDelay = Math.min(index, 5) * 60 + "ms";
  });

  if ("IntersectionObserver" in window) {
    var seen = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        seen.unobserve(entry.target);
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { seen.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  document.querySelectorAll("[data-count]").forEach(function (el) {
    var target = Number(el.getAttribute("data-count"));
    if (!target) return;
    var played = false;
    var play = function () {
      if (played) return;
      played = true;
      var start = performance.now();
      var tick = function (now) {
        var t = Math.min(1, (now - start) / 800);
        var eased = 1 - Math.pow(1 - t, 3);
        el.textContent = String(Math.round(target * eased));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if ("IntersectionObserver" in window) {
      var watch = new IntersectionObserver(function (entries) {
        if (entries.some(function (entry) { return entry.isIntersecting; })) {
          play();
          watch.disconnect();
        }
      }, { threshold: 0.6 });
      watch.observe(el);
    } else {
      play();
    }
  });

  var rail = document.querySelector(".rail span");
  var drift = document.querySelectorAll("[data-drift]");
  if (rail || drift.length) {
    var paint = function () {
      if (rail) {
        var height = document.documentElement.scrollHeight - window.innerHeight;
        rail.style.width = (height > 0 ? (window.scrollY / height) * 100 : 0) + "%";
      }
      drift.forEach(function (el) {
        var top = el.getBoundingClientRect().top;
        el.style.transform = "translateY(" + ((top - window.innerHeight * 0.4) * -0.08).toFixed(1) + "px)";
      });
    };
    paint();
    window.addEventListener("scroll", paint, { passive: true });
  }
})();
