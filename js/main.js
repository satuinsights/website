(function () {
  'use strict';

  var navToggle = document.querySelector('.nav-toggle');
  var siteNav = document.querySelector('.site-nav');
  var contactForm = document.getElementById('contactForm');
  var formFeedback = document.getElementById('formFeedback');
  var header = document.querySelector('.site-header');

  function initPageLoad() {
    document.body.classList.add('is-loaded');
  }

  function initMobileNav() {
    if (!navToggle || !siteNav) return;

    navToggle.addEventListener('click', function () {
      var isOpen = siteNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    siteNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
      });
    });

    document.addEventListener('click', function (e) {
      if (!siteNav.classList.contains('is-open')) return;
      if (!siteNav.contains(e.target) && !navToggle.contains(e.target)) {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open menu');
      }
    });
  }

  function initScrollReveal() {
    // Auto add reveal to common elements for better fade-up animation
    document.querySelectorAll('main section p, main section h2, main section h3, main section li, main section .btn, main section img').forEach(function (el) {
      if (!el.classList.contains('reveal') && !el.classList.contains('hero-animate') && !el.closest('.card, .feature, .industry-item, .method-card, .founder-photo')) {
        el.classList.add('reveal');
      }
    });

    var revealElements = document.querySelectorAll('.reveal');

    if (!revealElements.length) return;

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  function initStaggerGrids() {
    var grids = document.querySelectorAll('.card-grid, .industry-grid, .methods-grid, .service-details');

    grids.forEach(function (grid) {
      var children = grid.children;
      Array.prototype.forEach.call(children, function (child, index) {
        if (!child.classList.contains('reveal')) {
          child.classList.add('reveal');
        }
        var delay = Math.min(index + 1, 4);
        child.classList.add('reveal-delay-' + delay);
      });
    });
  }

  function initHeaderScroll() {
    if (!header) return;

    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 20) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }, { passive: true });
  }

  function initSmoothLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = anchor.getAttribute('href');
        if (targetId === '#') return;

        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  function initContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('name').value.trim();
      var email = document.getElementById('email').value.trim();
      var organisation = document.getElementById('organisation').value.trim();
      var message = document.getElementById('message').value.trim();

      formFeedback.className = 'form-feedback';

      if (!name || !email || !message) {
        formFeedback.textContent = 'Please fill in all required fields.';
        formFeedback.classList.add('error');
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formFeedback.textContent = 'Please enter a valid email address.';
        formFeedback.classList.add('error');
        return;
      }

      var subject = encodeURIComponent('Research enquiry from ' + name);
      var bodyParts = [
        'Name: ' + name,
        'Email: ' + email
      ];

      if (organisation) {
        bodyParts.push('Organisation: ' + organisation);
      }

      bodyParts.push('', 'Message:', message);

      var mailtoLink = 'mailto:jennifer@satuinsights.com?subject=' + subject + '&body=' + encodeURIComponent(bodyParts.join('\n'));

      window.location.href = mailtoLink;

      formFeedback.textContent = 'Opening your email client. If it does not open, please email jennifer@satuinsights.com directly.';
      formFeedback.classList.add('success');
    });
  }

  initPageLoad();
  initMobileNav();
  initStaggerGrids();
  initScrollReveal();
  initHeaderScroll();
  initSmoothLinks();
  initContactForm();
})();
