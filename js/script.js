// Update the year in the footer.
document.querySelectorAll('[data-year]').forEach(function(item) {
  item.textContent = new Date().getFullYear();
});

// Mobile menu.
const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuButton && navLinks) {
  menuButton.addEventListener('click', function() {
    const isOpen = navLinks.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', isOpen);
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });
}

// Light/dark mode.
const themePreferenceKey = 'portfolio-theme';
if (localStorage.getItem(themePreferenceKey) === 'light') {
  document.body.classList.add('light-mode');
}

document.querySelectorAll('.theme-toggle').forEach(function(button) {
  button.addEventListener('click', function() {
    const isLightMode = document.body.classList.toggle('light-mode');
    localStorage.setItem(themePreferenceKey, isLightMode ? 'light' : 'dark');
  });
});

// Filter project cards by their data-category attribute.
const filters = document.querySelectorAll('[data-filter]');
const cards = document.querySelectorAll('.project-page-grid [data-category]');
const no_projects = document.getElementById("no-projects")
filters.forEach(function(button) {
  button.addEventListener('click', function() {
    const category = button.dataset.filter;
    let count = 0;
    cards.forEach(function(card) {
      const show = category === 'all' || card.dataset.category.split(' ').includes(category);
      card.hidden = !show;
      if (show) count++;
    });
    filters.forEach(function(item) { item.classList.remove('active'); });
    button.classList.add('active');
    const status = document.querySelector('.filter-status');
    if (status) status.textContent = count + ' projects shown';
    no_projects.hidden = count !== 0;
  });
});

// Copy email (works best on HTTPS, including GitHub Pages).
const copyButton = document.querySelector('[data-copy-email]');
if (copyButton) {
  copyButton.addEventListener('click', function() {
    const email = copyButton.dataset.copyEmail;
    const feedback = document.querySelector('.copy-feedback');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(function() {
        feedback.textContent = 'Email copied!';
      }).catch(function() { feedback.textContent = email; });
    } else { feedback.textContent = email; }
  });
}

// A static site cannot send email itself; open the visitor's email app.
const form = document.querySelector('#contact-form');
if (form) {
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.querySelector('#sender-name').value;
    const email = document.querySelector('#sender-email').value;
    const topic = document.querySelector('#message-topic').value;
    const message = document.querySelector('#sender-message').value;
    const subject = encodeURIComponent('Portfolio: ' + topic);
    const body = encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')');
    document.querySelector('#form-feedback').textContent = 'Opening your email app...';
    // window.location.href = 'mailto:farazahmedilahi@gmail.com?subject=' + subject + '&body=' + body;
  });
}
