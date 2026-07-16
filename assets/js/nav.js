/**
 * Shared navigation utilities for the textbook site.
 * The mobile menu button is a real <button> for accessibility;
 * this script toggles the sidebar and updates ARIA attributes.
 */
(function () {
  'use strict';

  const currentUrl = new URL(window.location.href);
  const currentPath = currentUrl.pathname;

  function resolve(href) {
    return new URL(href, currentUrl);
  }

  function samePath(href) {
    return resolve(href).pathname === currentPath;
  }

  function sameLink(href) {
    const resolved = resolve(href);
    return resolved.pathname === currentPath && resolved.hash === currentUrl.hash;
  }

  const sidebarLinks = document.querySelectorAll('.sidebar nav a');

  // Highlight current page link in the sidebar.
  // First try exact match including hash, then fall back to the page-level link.
  let exactMatch = null;
  let pageMatch = null;

  sidebarLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (!href) return;

    if (sameLink(href)) {
      exactMatch = link;
    }

    if (samePath(href) && !pageMatch) {
      pageMatch = link;
    }
  });

  // Case pages live under the "延伸阅读" section; keep its TOC link highlighted.
  if (!exactMatch && !pageMatch && currentPath.includes('/cases/')) {
    sidebarLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      if (!href) return;
      if (resolve(href).pathname.split('/').pop() === 'extended-reading.html') {
        pageMatch = link;
      }
    });
  }

  const activeLink = exactMatch || pageMatch;
  if (activeLink) {
    activeLink.classList.add('active');
  }

  // Collapse sub-menus for chapters other than the current page.
  document.querySelectorAll('.sidebar nav > ul > li').forEach(function (li) {
    if (li.classList.contains('nav-section')) return;

    const isCurrentChapter = Array.from(li.querySelectorAll('a')).some(function (link) {
      const href = link.getAttribute('href');
      if (!href) return false;
      return samePath(href);
    });

    if (!isCurrentChapter) {
      const submenu = li.querySelector(':scope > ul');
      if (submenu) submenu.classList.add('collapsed');
    }
  });

  // Mobile menu toggle.
  const menuBtn = document.querySelector('.menu-btn');
  const navToggle = document.getElementById('nav-toggle');

  function setMenuOpen(open) {
    document.body.classList.toggle('nav-open', open);
    if (menuBtn) {
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? '关闭目录' : '打开目录');
    }
    // Keep the hidden checkbox in sync so the CSS fallback still works.
    if (navToggle) {
      navToggle.checked = open;
    }
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      const isOpen = document.body.classList.contains('nav-open');
      setMenuOpen(!isOpen);
    });
  }

  // On mobile, close the sidebar after clicking an anchor link.
  sidebarLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 768) {
        setMenuOpen(false);
      }
    });
  });
})();
