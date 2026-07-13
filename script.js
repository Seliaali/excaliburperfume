// Excalibur Perfume - vanilla JS
(function () {
  var TESTIMONIALS = [
    { name: "Mina",     date: "Jun 3, 2026",  stars: 5, text: "My purchase was exactly as described. Communication was prompt. Would recommend this buyer." },
    { name: "Jamison",  date: "May 26, 2026", stars: 5, text: "Very nice guy, replies quickly and a smooth transaction." },
    { name: "Katy",     date: "May 5, 2026",  stars: 5, text: "Excellent seller!!! Will definitely come back again." },
    { name: "Aneeqa",   date: "Apr 28, 2026", stars: 5, text: "The seller was polite and the item was exactly as described. It was a quick transaction. Seller was also quick to respond." },
    { name: "Kevin",    date: "Apr 23, 2026", stars: 5, text: "Great guy ... very understanding." },
    { name: "Gio",      date: "Apr 9, 2026",  stars: 5, text: "A++++++ 5 star. Honest, great prices. Item as described, trustworthy salesman. Thanks!" },
    { name: "Hussein",  date: "Nov 20, 2025", stars: 5, text: "Met me half way since I was a bit far, very friendly, professional and kind, highly recommend, will repeat for sure." },
    { name: "Mohammed", date: "Nov 11, 2025", stars: 5, text: "Helpful and kind person. I'd recommend him to anyone who's looking for great deals on perfumes." }
  ];

  var STAR_SVG = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.9L22 10l-5.5 4.8L18.2 22 12 18.3 5.8 22l1.7-7.2L2 10l7.1-1.1L12 2z"/></svg>';

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c];
    });
  }

  // Header 5 stars
  var headerStars = document.getElementById("header-stars");
  if (headerStars) {
    headerStars.innerHTML = new Array(5).fill(STAR_SVG).join("");
  }

  // Testimonial cards — build first, then observe
  var grid = document.getElementById("testimonials-grid");
  if (grid) {
    grid.innerHTML = TESTIMONIALS.map(function (t) {
      var stars = new Array(t.stars).fill(STAR_SVG).join("");
      return (
        '<div class="t-card">' +
          '<div class="t-head">' +
            '<div>' +
              '<p class="t-name">' + escapeHtml(t.name) + '</p>' +
              '<p class="t-date">' + escapeHtml(t.date) + '</p>' +
            '</div>' +
            '<div class="t-stars">' + stars + '</div>' +
          '</div>' +
          '<p class="t-text">"' + escapeHtml(t.text) + '"</p>' +
        '</div>'
      );
    }).join("");
  }

  // ── Scroll-reveal: fires when top edge of element enters the bottom 85% of viewport ──
  function initScrollReveal() {
    if (!("IntersectionObserver" in window)) {
      // Fallback: just show everything
      document.querySelectorAll(".scroll-reveal, .t-card").forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    // rootMargin "0px 0px -80px 0px" means trigger 80px before bottom of viewport
    // threshold: 0 means fire as soon as even 1px is visible
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      });
    }, { threshold: 0, rootMargin: "0px 0px -60px 0px" });

    // Observe all targets — cards are already in the DOM at this point
    var targets = document.querySelectorAll(".scroll-reveal, .t-card");
    targets.forEach(function (el, i) {
      if (el.classList.contains("t-card")) {
        el.style.transitionDelay = (i % 2 === 0 ? 0 : 100) + "ms";
      }
      observer.observe(el);
    });
  }

  initScrollReveal();

  // Year
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
