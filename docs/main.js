/* ============================================================
   MediVisual Artist - Main JavaScript (main.js)
   OPC Ecosystem Floating Nav + Scroll Animations
   Part of OPC Ecosystem by MoKangMedical
   ============================================================ */
(function() {
  'use strict';

  /* ---- OPC Ecosystem Floating Nav ---- */
  function initOPCFloatNav() {
    var nav = document.createElement('nav');
    nav.className = 'opc-float-nav';
    nav.id = 'opcFloatNav';
    nav.setAttribute('aria-label', 'OPC Ecosystem Navigation');

    var links = [
      { href: 'https://mokangmedical.github.io/opc-homepage/', icon: 'home', label: 'OPC 首页', id: 'opcHome' },
      { href: 'https://mokangmedical.github.io/opc-alliance/', icon: 'hub', label: 'OPC Hub', id: 'opcHub' },
      { href: 'https://github.com/MoKangMedical/medivisual-artist', icon: 'github', label: 'GitHub', id: 'opcGithub', target: '_blank' },
      { href: 'index.html', icon: 'app', label: '本项目首页', id: 'opcProject' }
    ];

    var icons = {
      home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
      hub: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
      github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
      app: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>'
    };

    links.forEach(function(item) {
      var a = document.createElement('a');
      a.href = item.href;
      a.className = 'opc-float-btn';
      a.id = item.id;
      if (item.target) a.target = item.target;
      a.innerHTML = '<span class="opc-float-icon">' + icons[item.icon] + '</span><span>' + item.label + '</span>';
      nav.appendChild(a);
    });

    document.body.appendChild(nav);

    // Show/hide based on scroll position
    var floatNav = document.getElementById('opcFloatNav');
    var lastScrollY = 0;
    var ticking = false;

    function updateFloatNav() {
      if (window.scrollY > 300) {
        floatNav.classList.add('visible');
      } else {
        floatNav.classList.remove('visible');
      }
      ticking = false;
    }

    window.addEventListener('scroll', function() {
      lastScrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(updateFloatNav);
        ticking = true;
      }
    }, { passive: true });

    // Highlight current project link
    var currentFile = window.location.pathname.split('/').pop() || 'index.html';
    var projectLink = document.getElementById('opcProject');
    if (projectLink && projectLink.getAttribute('href') === currentFile) {
      projectLink.classList.add('active');
    }
  }

  /* ---- Scroll Reveal (IntersectionObserver) ---- */
  function initScrollReveal() {
    var revealEls = document.querySelectorAll('.reveal, .timeline-entry');
    if (revealEls.length === 0) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealEls.forEach(function(el) {
      observer.observe(el);
    });
  }

  /* ---- Counter Animation ---- */
  function initCounters() {
    var counters = document.querySelectorAll('[data-target]');
    if (counters.length === 0) return;

    var counted = false;
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting && !counted) {
          counted = true;
          counters.forEach(function(el) {
            var target = parseInt(el.getAttribute('data-target'), 10);
            if (!target || target === 0) return;
            var current = 0;
            var step = Math.max(1, Math.floor(target / 40));
            var suffix = el.parentElement.querySelector('.stat-label');
            var suffixText = '';
            if (suffix) {
              var label = suffix.textContent;
              if (label.includes('时间')) suffixText = 'h';
              else if (label.includes('%') || label.includes('率') || label.includes('节省')) suffixText = '%';
            }
            var timer = setInterval(function() {
              current += step;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              el.textContent = current + suffixText;
            }, 30);
          });
        }
      });
    }, { threshold: 0.3 });

    var parent = counters[0].closest('.stats-grid, .stats-bar, section');
    if (parent) {
      observer.observe(parent);
    } else {
      counters.forEach(function(el) { observer.observe(el); });
    }
  }

  /* ---- Nav Scroll State ---- */
  function initNavScroll() {
    var nav = document.querySelector('.main-nav') || document.getElementById('navbar') || document.getElementById('mainNav');
    var backTop = document.getElementById('backTop');
    var opcTopnav = document.querySelector('.opc-topnav');

    function onScroll() {
      var scrolled = window.scrollY > 50;
      if (nav) {
        nav.classList.toggle('scrolled', scrolled);
      }
      if (backTop) {
        var showBackTop = window.scrollY > 400;
        backTop.classList.toggle('show', showBackTop);
        backTop.classList.toggle('visible', showBackTop);
      }
      // Subtle OPC topnav hide on scroll down
      if (opcTopnav) {
        if (window.scrollY > 200) {
          opcTopnav.style.transform = 'translateY(-100%)';
        } else {
          opcTopnav.style.transform = 'translateY(0)';
        }
        opcTopnav.style.transition = 'transform .3s ease';
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- Back to Top ---- */
  function initBackToTop() {
    var backTop = document.getElementById('backTop');
    if (!backTop) return;
    backTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Mobile Menu Toggle ---- */
  function initMobileMenu() {
    var toggle = document.getElementById('mobileToggle') || document.getElementById('hamburger');
    var navLinks = document.getElementById('navLinks');
    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', function() {
      navLinks.classList.toggle('show');
      navLinks.classList.toggle('open');
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navLinks.classList.remove('show');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ---- Active Nav Link ---- */
  function initActiveNavLink() {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    var navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
    navLinks.forEach(function(link) {
      var href = link.getAttribute('href');
      if (href === currentPage) {
        link.classList.add('active');
      }
    });
  }

  /* ---- Smooth anchor scrolling ---- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var offset = 100; // Account for fixed nav
          var top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });
  }

  /* ---- Initialize Everything ---- */
  document.addEventListener('DOMContentLoaded', function() {
    initOPCFloatNav();
    initScrollReveal();
    initCounters();
    initNavScroll();
    initBackToTop();
    initMobileMenu();
    initActiveNavLink();
    initSmoothScroll();
  });

})();
