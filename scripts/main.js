/**
 * Arredondo — scripts principales
 * - Nav sólida al scroll
 * - Menú móvil (drawer)
 * - Revelado al entrar en viewport (Intersection Observer)
 * - Cierre de drawer al navegar por anclas
 */

(function () {
  "use strict";

  var NAV_SCROLL_THRESHOLD = 100;
  var REVEAL_SELECTOR = ".reveal";
  var IO_THRESHOLD = 0.15;

  var nav = document.getElementById("nav-principal");
  var drawer = document.getElementById("nav-drawer");
  var toggle = document.querySelector(".site-nav__toggle");

  function setNavSolid() {
    if (!nav) return;
    var y = window.scrollY || document.documentElement.scrollTop;
    if (y > NAV_SCROLL_THRESHOLD) {
      nav.classList.add("is-solid");
    } else {
      nav.classList.remove("is-solid");
    }
  }

  function setDrawerInert(isClosed) {
    var panel = document.getElementById("panel-menu-movil");
    if (!panel || !("inert" in HTMLElement.prototype)) return;
    panel.inert = isClosed;
  }

  function openDrawer() {
    if (!drawer || !toggle) return;
    drawer.setAttribute("aria-hidden", "false");
    setDrawerInert(false);
    requestAnimationFrame(function () {
      drawer.classList.add("is-open");
    });
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Cerrar menú de navegación");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    if (!drawer || !toggle) return;
    drawer.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú de navegación");
    document.body.style.overflow = "";
    window.setTimeout(function () {
      if (!drawer.classList.contains("is-open")) {
        drawer.setAttribute("aria-hidden", "true");
        setDrawerInert(true);
      }
    }, 360);
  }

  function initNavScroll() {
    setNavSolid();
    window.addEventListener("scroll", setNavSolid, { passive: true });
  }

  function initDrawer() {
    if (!toggle || !drawer) return;
    setDrawerInert(true);

    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      if (expanded) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    drawer.addEventListener("click", function (e) {
      var t = e.target;
      if (t && t.getAttribute && t.getAttribute("data-close-drawer") !== null) {
        closeDrawer();
      }
    });

    document.querySelectorAll('[data-close-drawer][href^="#"]').forEach(function (link) {
      link.addEventListener("click", function () {
        closeDrawer();
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && drawer.classList.contains("is-open")) {
        closeDrawer();
        toggle.focus();
      }
    });
  }

  function initReveal() {
    var nodes = document.querySelectorAll(REVEAL_SELECTOR);
    if (!nodes.length || !("IntersectionObserver" in window)) {
      nodes.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: IO_THRESHOLD, rootMargin: "0px 0px -5% 0px" }
    );

    nodes.forEach(function (el) {
      io.observe(el);
    });
  }

  function initHeroVideo() {
    var video = document.querySelector(".hero__video");
    if (!video) return;

    var tryPlay = function () {
      if (video.paused) {
        var p = video.play();
        if (p && p.catch) p.catch(function () {});
      }
    };

    ["canplay", "loadedmetadata", "loadeddata"].forEach(function (evt) {
      video.addEventListener(evt, tryPlay);
    });

    // Mobile browsers suspend the load early — if nothing decoded yet, restart
    video.addEventListener("suspend", function () {
      if (video.readyState === 0) {
        video.load();
        tryPlay();
      }
    });

    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) tryPlay();
    });

    // Fallback: retry a few times in case the first call fires too early
    tryPlay();
    window.setTimeout(tryPlay, 500);
    window.setTimeout(tryPlay, 1500);
  }

  initNavScroll();
  initDrawer();
  initReveal();
  initHeroVideo();
})();
