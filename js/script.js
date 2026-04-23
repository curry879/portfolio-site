history.scrollRestoration = "manual";

window.addEventListener("load", () => {
  window.scrollTo({
    top: 0,
    behavior: "instant"
  });
});

const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu");
const themeToggle = document.querySelector(".theme-toggle");
const navLinks = document.querySelectorAll('a[href^="#"]');
const hiddenElements = document.querySelectorAll(".hidden");

if (burger && menu) {
  burger.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    themeToggle.textContent = document.body.classList.contains("light-theme") ? "☀️" : "🌙";
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    e.preventDefault();

    const header = document.querySelector(".header");
    const headerHeight = header ? header.offsetHeight : 0;
    const top = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

    window.scrollTo({
      top,
      behavior: "smooth"
    });

    if (menu && menu.classList.contains("active")) {
      menu.classList.remove("active");
    }
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.16
  }
);

hiddenElements.forEach((element) => observer.observe(element));

/* modal */

const projectCards = document.querySelectorAll(".project-card");
const modal = document.querySelector(".modal");
const modalTitle = document.querySelector(".modal-title");
const modalDescription = document.querySelector(".modal-description");
const closeModal = document.querySelector(".close-modal");
const modalAction = document.querySelector(".modal-action");

function closeModalWindow() {
  if (!modal) return;
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

projectCards.forEach((card) => {
  card.addEventListener("click", () => {
    if (!modal || !modalTitle || !modalDescription) return;

    modalTitle.textContent = card.dataset.title || "Проект";
    modalDescription.textContent =
      card.dataset.description || "Описание проекта появится позже.";

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

if (closeModal) {
  closeModal.addEventListener("click", closeModalWindow);
}

if (modalAction) {
  modalAction.addEventListener("click", closeModalWindow);
}

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModalWindow();
    }
  });
}

/* hero slider */

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".slider-dot");
const sliderTitle = document.getElementById("slider-title");
const sliderText = document.getElementById("slider-text");
const sliderCurrent = document.getElementById("slider-current");

let currentSlide = 0;
let sliderInterval;

function updateSlider(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });

  const activeSlide = slides[index];
  if (activeSlide && sliderTitle && sliderText && sliderCurrent) {
    sliderTitle.textContent = activeSlide.dataset.title || "Preview";
    sliderText.textContent = activeSlide.dataset.text || "";
    sliderCurrent.textContent = String(index + 1).padStart(2, "0");
  }

  currentSlide = index;
}

function nextSlide() {
  const nextIndex = (currentSlide + 1) % slides.length;
  updateSlider(nextIndex);
}

function startSlider() {
  if (slides.length > 1) {
    sliderInterval = setInterval(nextSlide, 3200);
  }
}

function resetSlider() {
  clearInterval(sliderInterval);
  startSlider();
}

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const index = Number(dot.dataset.slide);
    updateSlider(index);
    resetSlider();
  });
});

if (slides.length > 0) {
  updateSlider(0);
  startSlider();
}
