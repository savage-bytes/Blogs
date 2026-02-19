const initNavToggle = () => {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
};

const initTypewriter = () => {
  const target = document.getElementById("typewriter");
  if (!target) return;

  const roles = (target.dataset.roles || "").split("|").filter(Boolean);
  if (!roles.length) return;

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const tick = () => {
    const current = roles[roleIndex];
    if (!deleting) {
      charIndex += 1;
      target.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1200);
        return;
      }
    } else {
      charIndex -= 1;
      target.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(tick, deleting ? 40 : 90);
  };

  tick();
};

const initLoadingScreen = () => {
  const loading = document.querySelector(".loading-screen");
  const bar = document.querySelector(".loading-progress");
  if (!loading || !bar) return;

  requestAnimationFrame(() => {
    bar.style.width = "100%";
  });

  setTimeout(() => {
    loading.classList.add("hidden");
  }, 1300);
};

const initKonami = () => {
  const sequence = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];
  let position = 0;

  document.addEventListener("keydown", (event) => {
    if (event.key !== sequence[position]) {
      position = 0;
      return;
    }
    position += 1;
    if (position === sequence.length) {
      document.body.classList.toggle("easter-egg");
      position = 0;
      showToast("Konami mode activated");
    }
  });
};

const showToast = (message) => {
  const toast = document.createElement("div");
  toast.className = "message";
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.bottom = "24px";
  toast.style.right = "24px";
  toast.style.zIndex = "999";
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
};

document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  initTypewriter();
  initLoadingScreen();
  initKonami();
});
