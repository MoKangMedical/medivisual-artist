/* ============================================================
   MediVisual Artist - Shared JavaScript
   ============================================================ */
document.addEventListener('DOMContentLoaded', function() {

  // ---- Nav scroll state ----
  const nav = document.getElementById('navbar');
  const backTop = document.getElementById('backTop');

  function onScroll() {
    const scrolled = window.scrollY > 50;
    if (nav) nav.classList.toggle('scrolled', scrolled);
    if (backTop) backTop.classList.toggle('show', window.scrollY > 400);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Back to top ----
  if (backTop) {
    backTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Mobile menu toggle ----
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', function() {
      navLinks.classList.toggle('show');
    });
    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navLinks.classList.remove('show');
      });
    });
  }

  // ---- Scroll reveal (IntersectionObserver) ----
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length > 0) {
    var revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    revealEls.forEach(function(el) { revealObserver.observe(el); });
  }

  // ---- Counter animation ----
  window.animateCounters = function(selector) {
    var counters = document.querySelectorAll(selector || '.counter');
    counters.forEach(function(el) {
      var target = parseInt(el.getAttribute('data-target') || el.getAttribute('data-val') || '0', 10);
      if (target === 0) return;
      var current = 0;
      var step = Math.max(1, Math.ceil(target / 60));
      var timer = setInterval(function() {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = current.toLocaleString();
      }, 25);
    });
  };

  // ---- Active nav link highlighting ----
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  var navLinksAll = document.querySelectorAll('.nav-links a:not(.nav-cta)');
  navLinksAll.forEach(function(link) {
    var href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

});
