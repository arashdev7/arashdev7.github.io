// === Theme Toggle Setup ===
const topToggleBtn = document.getElementById('theme-toggle');
const sidebarToggleBtn = document.getElementById('theme-toggle-sidebar');
const topIcon = document.getElementById('theme-icon');
const sidebarIcon = document.getElementById('theme-icon-sidebar');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

function updateIcons(isLight) {
  const src = isLight ? 'rdev.svg' : 'ft.svg';
  if (topIcon) topIcon.src = src;
  if (sidebarIcon) sidebarIcon.src = src;
}

function updateThemeImages(isLight) {
  const images = document.querySelectorAll('img[data-light][data-dark]');
  images.forEach(img => {
    img.src = isLight ? img.dataset.light : img.dataset.dark;
  });
}

// Initial theme
const isLight = savedTheme === 'light' || (!savedTheme && !prefersDark);
if (isLight) {
  document.body.classList.add('light-theme');
}
updateIcons(isLight);
updateThemeImages(isLight);

function toggleTheme() {
  document.body.classList.toggle('light-theme');
  const isLightNow = document.body.classList.contains('light-theme');
  localStorage.setItem('theme', isLightNow ? 'light' : 'dark');
  updateIcons(isLightNow);
  updateThemeImages(isLightNow);

  [topToggleBtn, sidebarToggleBtn].forEach(btn => {
    if (btn) {
      btn.classList.add('theme-animate');
      setTimeout(() => btn.classList.remove('theme-animate'), 600);
    }
  });
}

if (topToggleBtn) topToggleBtn.addEventListener('click', toggleTheme);
if (sidebarToggleBtn) sidebarToggleBtn.addEventListener('click', toggleTheme);

// === Read More Functionality ===
function toggleReadMore(button) {
  const project = button.closest('.project');
  project.classList.toggle('expanded');
  button.textContent = project.classList.contains('expanded') ? "Read less" : "Read more";
}

// === Mobile Sidebar Open/Close ===
const sidebar = document.getElementById('mobile-sidebar');
const openBtn = document.getElementById('mobile-menu-btn');
const closeBtn = document.querySelector('.close-sidebar');

openBtn.addEventListener('click', () => {
  sidebar.classList.add('active');
});

closeBtn.addEventListener('click', () => {
  sidebar.classList.remove('active');
});

// Close sidebar on link click (except for CONTACT ME trigger)
sidebar.querySelectorAll('a').forEach(link => {
  if (link.id !== 'contact-popup-trigger') {
    link.addEventListener('click', () => {
      sidebar.classList.remove('active');
    });
  }
});

// === Reveal Animations ===
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible', 'active');
    } else {
      entry.target.classList.remove('active');
    }
  });
}, { threshold: 0.6 });

reveals.forEach(el => observer.observe(el));

// === Contact Popup (Click Triggered) ===
document.addEventListener("DOMContentLoaded", function () {
  const contactTrigger = document.getElementById("contact-popup-trigger");
  const contactPopup = document.getElementById("contact-popup");

  if (contactTrigger && contactPopup) {
    contactTrigger.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isVisible = contactPopup.style.display === "flex";
      contactPopup.style.display = isVisible ? "none" : "flex";
    });

    document.addEventListener("click", (e) => {
      if (!contactPopup.contains(e.target) && e.target !== contactTrigger) {
        contactPopup.style.display = "none";
      }
    });
  }
});

document.addEventListener('click', function (e) {
  const isClickInsideSidebar = sidebar.contains(e.target);
  const isClickOnToggle = openBtn.contains(e.target); // <-- this line handles it
  const isOpen = sidebar.classList.contains('active');

  if (!isClickInsideSidebar && !isClickOnToggle && isOpen) {
    sidebar.classList.remove('active');
  }
});

if (sidebarToggleBtn) {
  sidebarToggleBtn.classList.add('animate');

  setTimeout(() => {
    sidebarToggleBtn.classList.remove('animate');
  }, 600); // Match animation duration
}

