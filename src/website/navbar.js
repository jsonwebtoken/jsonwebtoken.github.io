import { getOffsetBoundingClientRect } from './utils.js';

import {
  navbarElement,
  menuTriggerElement,
  menuLinks,
  sectionElements,
  menuScrollableLinks
} from './dom-elements-common.js';

export function setupNavbar() {
  window.addEventListener('scroll', () => {
    // Logo animation
    if (window.pageYOffset >= 130) {
      navbarElement.classList.add('fixed');
    } else {
      navbarElement.classList.remove('fixed');
    }

    // Navbar highlighting
    const navbarHeight = navbarElement.offsetHeight;
    const windowPos = window.pageYOffset;
    Array.prototype.forEach.call(sectionElements, section => {
      const top = getOffsetBoundingClientRect(section).top - navbarHeight;
      const bottom = top + section.offsetHeight;

      if (windowPos >= top && windowPos <= bottom) {
        Array.prototype.forEach.call(menuScrollableLinks, link => {
          if (link.getAttribute('href') === `#${section.id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  });

  // Mobile menu
  menuTriggerElement.addEventListener('click', () => {
    menuTriggerElement.classList.toggle('active');
    navbarElement.classList.toggle('open');
    document.body.classList.toggle('menu-mobile');
  });

  Array.prototype.forEach.call(menuLinks, item => {
    item.addEventListener('click', () => {
      menuTriggerElement.classList.remove('active');
      navbarElement.classList.remove('open');
      document.body.classList.remove('menu-mobile');
    });
  });
}
