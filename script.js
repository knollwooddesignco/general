const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

document.querySelectorAll('.submenu-toggle').forEach(button => {
  button.addEventListener('click', event => {
    event.preventDefault();
    const group = button.closest('.nav-group');
    if (!group) return;
    const isOpen = group.classList.toggle('submenu-open');
    button.setAttribute('aria-expanded', String(isOpen));
  });
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
