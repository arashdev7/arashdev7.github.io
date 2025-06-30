const toggleButton = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

// Set initial theme
if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
  document.body.classList.add('light-theme');
  themeIcon.src = 'rdev.svg'; // light theme icon
} else {
  themeIcon.src = 'ft.svg'; // dark theme icon
}

// On click: toggle theme and icon
toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  const isLight = document.body.classList.contains('light-theme');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  themeIcon.src = isLight ? 'rdev.svg' : 'ft.svg';
});

  function toggleReadMore(button) {
  const project = button.closest('.project');
  project.classList.toggle('expanded');
  button.textContent = project.classList.contains('expanded') ? "Read less" : "Read more";
}