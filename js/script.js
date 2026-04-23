history.scrollRestoration = "manual";

window.addEventListener("load", () => {
  window.scrollTo({
    top: 0,
    behavior: "instant"
  });
});

const hiddenElements = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.18
  }
);

hiddenElements.forEach((el) => observer.observe(el));

const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu");

if (burger && menu) {
  burger.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
}

const themeToggle = document.querySelector(".theme-toggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");

    if (document.body.classList.contains("light-theme")) {
      themeToggle.textContent = "☀️";
    } else {
      themeToggle.textContent = "🌙";
    }
  });
}

const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      e.preventDefault();

      const header = document.querySelector(".header");
      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition =
        targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

      if (menu && menu.classList.contains("active")) {
        menu.classList.remove("active");
      }
    }
  });
});

const projectCards = document.querySelectorAll(".project-card");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".close-modal");
const modalTitle = document.querySelector(".modal-title");
const modalDescription = document.querySelector(".modal-description");

projectCards.forEach((card) => {
  card.addEventListener("click", () => {
    if (modal && modalTitle && modalDescription) {
      modalTitle.textContent = card.dataset.title || "Проект";
      modalDescription.textContent =
        card.dataset.description || "Описание проекта появится позже.";
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  });
});

if (closeModal && modal) {
  closeModal.addEventListener("click", () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  });
}

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}