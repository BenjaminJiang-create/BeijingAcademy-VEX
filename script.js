document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector("button");
    const menu = dropdown.querySelector(".dropdown-menu");

    if (!trigger || !menu) return;

    let closeTimeout;

    trigger.setAttribute("aria-haspopup", "true");
    trigger.setAttribute("aria-expanded", "false");

    const openMenu = () => {
      clearTimeout(closeTimeout);
      dropdown.classList.add("open");
      trigger.setAttribute("aria-expanded", "true");
    };

    const closeMenu = () => {
      clearTimeout(closeTimeout);
      dropdown.classList.remove("open");
      trigger.setAttribute("aria-expanded", "false");
    };

    const scheduleClose = () => {
      clearTimeout(closeTimeout);
      closeTimeout = setTimeout(closeMenu, 150);
    };

    trigger.addEventListener("mouseenter", openMenu);
    menu.addEventListener("mouseenter", openMenu);

    dropdown.addEventListener("mouseleave", (event) => {
      if (dropdown.contains(event.relatedTarget)) return;
      scheduleClose();
    });

    trigger.addEventListener("focus", openMenu);
    menu.addEventListener("focus", openMenu);
    dropdown.addEventListener("focusout", (event) => {
      if (!dropdown.contains(event.relatedTarget)) {
        scheduleClose();
      }
    });

    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const isOpen = dropdown.classList.toggle("open");
      trigger.setAttribute("aria-expanded", String(isOpen));
      if (isOpen) {
        clearTimeout(closeTimeout);
      }
    });
  });

  document.addEventListener("click", (event) => {
    dropdowns.forEach((dropdown) => {
      const trigger = dropdown.querySelector("button");

      if (!trigger) return;

      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove("open");
        trigger.setAttribute("aria-expanded", "false");
      }
    });
  });
});
