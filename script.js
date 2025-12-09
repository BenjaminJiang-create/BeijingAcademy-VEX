document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }
});

// 数字递增动画
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10) || 0;
  const duration = parseInt(el.dataset.duration, 10) || 1500;
  const suffix = el.dataset.suffix || "";
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.floor(progress * target);

    // 千分位 + 后缀
    el.textContent = value.toLocaleString("en-US") + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// 进入视口时触发（类似 SpaceX 官网效果）
function initMetricsObserver() {
  const section = document.querySelector("#vex-numbers");
  if (!section) return;

  const counters = section.querySelectorAll("[data-count-up]");
  if (!counters.length) return;

  let hasRun = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasRun) {
          hasRun = true;
          counters.forEach((el) => animateCounter(el));
          observer.disconnect(); // 只跑一次
        }
      });
    },
    {
      threshold: 0.4 // 至少有 40% 在视口内就触发
    }
  );

  observer.observe(section);
}

document.addEventListener("DOMContentLoaded", initMetricsObserver);