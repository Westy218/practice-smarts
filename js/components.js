/* ══════════════════════════════════════════
   Practice Smarts — Shared Components
   Header + Footer injection for multi-page
   ══════════════════════════════════════════ */

/**
 * Determines the correct relative path prefix based on page location.
 * Pages in /pages/ need '../' prefix, root pages need './'.
 */
function getBasePath() {
  var path = window.location.pathname;
  if (path.indexOf('/pages/') !== -1) {
    return '../';
  }
  return './';
}

/**
 * Injects the main navigation into #nav-placeholder.
 * @param {string} type - 'main' for homepage nav with links, 'back' for sub-page nav with back button
 */
function loadNav(type) {
  var base = getBasePath();
  var placeholder = document.getElementById('nav-placeholder');
  if (!placeholder) return;

  if (type === 'main') {
    placeholder.innerHTML =
      '<nav id="main-nav">' +
        '<a class="nav-logo" href="' + base + 'index.html">Practice<span>Smarts</span></a>' +
        '<button class="nav-hamburger" id="nav-hamburger" onclick="toggleMobileMenu()" aria-label="Toggle menu">' +
          '<span></span><span></span><span></span>' +
        '</button>' +
        '<ul class="nav-links" id="nav-links">' +
          '<li><a href="' + base + 'index.html#who">Who We Help</a></li>' +
          '<li><a href="' + base + 'pages/practice-flow.html">Practice Flow</a></li>' +
          '<li><a href="' + base + 'pages/about.html">About</a></li>' +
          '<li><a href="' + base + 'pages/case-study.html">Case Study</a></li>' +
          '<li><a href="' + base + 'pages/blog.html">Insights</a></li>' +
          '<li><a href="' + base + 'pages/calculator.html">Calculator</a></li>' +
          '<li><a href="' + base + 'pages/first-step.html" class="nav-cta">Take the First Step</a></li>' +
        '</ul>' +
      '</nav>';
  } else {
    placeholder.innerHTML =
      '<nav id="main-nav">' +
        '<a class="nav-logo" href="' + base + 'index.html">Practice<span>Smarts</span></a>' +
        '<a href="' + base + 'index.html" class="nav-back">Back to site</a>' +
      '</nav>';
  }

  // Scroll effect
  var nav = document.getElementById('main-nav');
  if (nav) {
    window.addEventListener('scroll', function() {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });
  }
}

/**
 * Toggle mobile menu
 */
function toggleMobileMenu() {
  var hamburger = document.getElementById('nav-hamburger');
  var links = document.getElementById('nav-links');
  if (hamburger && links) {
    hamburger.classList.toggle('active');
    links.classList.toggle('mobile-open');
  }
}

/**
 * Injects the full footer into #footer-placeholder.
 * @param {string} type - 'full' for homepage footer, 'simple' for sub-page footer
 */
function loadFooter(type) {
  var base = getBasePath();
  var placeholder = document.getElementById('footer-placeholder');
  if (!placeholder) return;

  if (type === 'full') {
    placeholder.innerHTML =
      '<footer>' +
        '<div class="footer-inner">' +
          '<div class="footer-top">' +
            '<div class="footer-brand">' +
              '<a class="footer-logo" href="' + base + 'index.html">Practice<span>Smarts</span></a>' +
              '<div class="footer-tagline">The clever way to run your practice.</div>' +
              '<nav class="footer-nav">' +
                '<a href="' + base + 'index.html#who">Who We Help</a>' +
                '<a href="' + base + 'pages/practice-flow.html">Practice Flow</a>' +
                '<a href="' + base + 'pages/about.html">About Us</a>' +
                '<a href="' + base + 'pages/case-study.html">Case Study</a>' +
                '<a href="' + base + 'pages/blog.html">Insights</a>' +
                '<a href="' + base + 'index.html#contact">Get in Touch</a>' +
              '</nav>' +
            '</div>' +
            '<div class="footer-calculator">' +
              '<p class="footer-calc-label">Value Calculator</p>' +
              '<h3 class="footer-calc-title">Not sure yet? Find out what inefficiency is already costing your firm.</h3>' +
              '<p class="footer-calc-body">Input a few details about your practice. See the annual cost of running on instinct — in time, in money, and in people. Takes four minutes.</p>' +
              '<a href="' + base + 'pages/calculator.html" class="footer-calc-link">Calculate your number</a>' +
            '</div>' +
          '</div>' +
          '<div class="footer-bottom">' +
            '<div class="footer-copy">&copy; 2025 Practice Smarts. All rights reserved.</div>' +
            '<div class="footer-copy">practicesmarts.com.au</div>' +
          '</div>' +
        '</div>' +
      '</footer>';
  } else {
    placeholder.innerHTML =
      '<footer class="footer-simple">' +
        '<a class="footer-logo" href="' + base + 'index.html">Practice<span>Smarts</span></a>' +
        '<div class="footer-copy">&copy; 2025 Practice Smarts. All rights reserved.</div>' +
      '</footer>';
  }
}

/**
 * Scroll reveal animation observer
 */
function initReveals() {
  var reveals = document.querySelectorAll('.reveal:not(.visible)');
  if (!reveals.length) return;
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(function(el) { observer.observe(el); });
}

// Auto-init reveals on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(initReveals, 100);
});
