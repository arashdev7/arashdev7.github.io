// Get both buttons and icons (some might be null)
const topToggleBtn = document.getElementById('theme-toggle');
const sidebarToggleBtn = document.getElementById('theme-toggle-sidebar');

const topIcon = document.getElementById('theme-icon');
const sidebarIcon = document.getElementById('theme-icon-sidebar');

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

// Utility to set both icons
function updateIcons(isLight) {
  const src = isLight ? 'rdev.svg' : 'ft.svg';
  if (topIcon) topIcon.src = src;
  if (sidebarIcon) sidebarIcon.src = src;
}

// Set initial theme
const isLight = savedTheme === 'light' || (!savedTheme && !prefersDark);
if (isLight) {
  document.body.classList.add('light-theme');
}
updateIcons(isLight);

// Theme toggle function
function toggleTheme() {
  document.body.classList.toggle('light-theme');
  const isLightNow = document.body.classList.contains('light-theme');
  localStorage.setItem('theme', isLightNow ? 'light' : 'dark');
  updateIcons(isLightNow);
}

// Attach listeners
if (topToggleBtn) topToggleBtn.addEventListener('click', toggleTheme);
if (sidebarToggleBtn) sidebarToggleBtn.addEventListener('click', toggleTheme);


  function toggleReadMore(button) {
  const project = button.closest('.project');
  project.classList.toggle('expanded');
  button.textContent = project.classList.contains('expanded') ? "Read less" : "Read more";
}

  const sidebar = document.getElementById('mobile-sidebar');
  const openBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.querySelector('.close-sidebar');

  openBtn.addEventListener('click', () => {
    sidebar.classList.add('active');
  });

  closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
  });

  sidebar.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      sidebar.classList.remove('active');
    });
  });
