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

    if (!trigger) return;

    trigger.setAttribute("aria-haspopup", "true");
    trigger.setAttribute("aria-expanded", "false");

    const openMenu = () => {
      dropdown.classList.add("open");
      trigger.setAttribute("aria-expanded", "true");
    };

    const closeMenu = () => {
      dropdown.classList.remove("open");
      trigger.setAttribute("aria-expanded", "false");
    };

    trigger.addEventListener("mouseenter", openMenu);
    dropdown.addEventListener("mouseleave", closeMenu);
    trigger.addEventListener("focus", openMenu);
    dropdown.addEventListener("focusout", (event) => {
      if (!dropdown.contains(event.relatedTarget)) {
        closeMenu();
      }
    });

    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const isOpen = dropdown.classList.toggle("open");
      trigger.setAttribute("aria-expanded", String(isOpen));
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
