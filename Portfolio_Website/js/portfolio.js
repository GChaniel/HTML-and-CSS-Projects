// ====================== SAFE STORAGE HELPERS =====================
// localStorage can throw (private mode, blocked site data), so wrap it.
function readStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    /* storage unavailable: the site still works without it */
  }
}

// ====================== ACTIVE NAV LINK ON SCROLL =====================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav_link");

function activeLinkOnScroll() {
  const scrollY = window.scrollY;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 180;
    const sectionId = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active-link");
        link.removeAttribute("aria-current");
      });

      const activeLink = document.querySelector(
        '.nav_link[href="#' + sectionId + '"]',
      );

      if (activeLink) {
        activeLink.classList.add("active-link");
        activeLink.setAttribute("aria-current", "true");
      }
    }
  });
}

window.addEventListener("scroll", activeLinkOnScroll);
activeLinkOnScroll();

//================== MOBILE MENU (OPEN / CLOSE) ==================
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");
const navMenu = document.getElementById("nav-menu");

function setMenu(open) {
  navMenu.classList.toggle("show-menu", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

navToggle.addEventListener("click", () => {
  const opening = !navMenu.classList.contains("show-menu");
  setMenu(opening);
  if (opening) navClose.focus();
});

navClose.addEventListener("click", () => {
  setMenu(false);
  navToggle.focus();
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navMenu.classList.contains("show-menu")) {
    setMenu(false);
    navToggle.focus();
  }
});

//===================== HEADER EFFECT ON SCROLL =======================
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  if (window.scrollY >= 50) {
    header.classList.add("scroll-header");
  } else {
    header.classList.remove("scroll-header");
  }
});

//=================== HERO VIDEO (REDUCED MOTION + PAUSE) ===============
const heroVideo = document.getElementById("home-video");
const videoToggle = document.getElementById("video-toggle");
const videoToggleIcon = document.getElementById("video-toggle-icon");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const saveData = navigator.connection && navigator.connection.saveData;

function setVideoPlaying(playing) {
  if (playing) {
    const attempt = heroVideo.play();
    if (attempt && attempt.catch) attempt.catch(() => {});
  } else {
    heroVideo.pause();
  }
  videoToggleIcon.className = playing ? "ri-pause-line" : "ri-play-line";
  videoToggle.setAttribute(
    "aria-label",
    playing ? "Pause background video" : "Play background video",
  );
}

if (reduceMotion.matches || saveData) {
  // Poster image only: no autoplay for people who asked for less motion
  // or are saving data.
  heroVideo.removeAttribute("autoplay");
  heroVideo.setAttribute("preload", "none");
  setVideoPlaying(false);
}

videoToggle.addEventListener("click", () => {
  setVideoPlaying(heroVideo.paused);
});

// ================= PORTFOLIO FILTER =================
const filterBar = document.getElementById("portfolio-filters");
const filterButtons = document.querySelectorAll(".filter_btn");
const portfolioCards = document.querySelectorAll(
  ".portfolio_card[data-category]",
);

// The bar is hidden by default in the HTML (no flash before this runs).
// Only offer categories that actually have projects, and reveal the bar
// only when there are at least two categories to choose between.
const usedCategories = new Set(
  Array.from(portfolioCards).map((card) => card.dataset.category),
);

filterButtons.forEach((button) => {
  const filterValue = button.dataset.filter;
  if (filterValue !== "all" && !usedCategories.has(filterValue)) {
    button.hidden = true;
  }
});

filterBar.hidden = usedCategories.size < 2;

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
      btn.setAttribute("aria-pressed", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");

    const filterValue = button.dataset.filter;

    portfolioCards.forEach((card) => {
      const cardCategory = card.dataset.category;

      if (filterValue === "all" || filterValue === cardCategory) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    });
  });
});

// ================= CONTACT FORM VALIDATION =================
const contactForm = document.getElementById("contact_form");
const contactMessage = document.getElementById("contact-message");

contactForm.addEventListener("submit", function (event) {
  const name = contactForm.elements["name"].value.trim();
  const email = contactForm.elements["email"].value.trim();
  const message = contactForm.elements["message"].value.trim();

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;

  if (name === "" || email === "" || message === "") {
    event.preventDefault();
    contactMessage.textContent = "Please fill in all fields.";
    contactMessage.classList.add("error");
    return;
  }

  if (!emailPattern.test(email)) {
    event.preventDefault();
    contactMessage.textContent = "Please enter a valid email address.";
    contactMessage.classList.add("error");
    return;
  }

  if (message.length < 20) {
    event.preventDefault();
    contactMessage.textContent =
      "Please enter a message with at least 20 characters.";
    contactMessage.classList.add("error");
    return;
  }

  contactMessage.textContent = "Thank you. Your message is being sent.";
  contactMessage.classList.remove("error");
});

//=================== DARK / LIGHT MODE TOGGLE ===================
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const themeText = document.getElementById("theme-text");

const savedTheme = readStorage("selected-theme");

function setLightMode() {
  document.body.classList.add("light-theme");
  themeIcon.classList.remove("ri-sun-line");
  themeIcon.classList.add("ri-moon-line");
  themeText.textContent = "Night";
  writeStorage("selected-theme", "light");
}

function setDarkMode() {
  document.body.classList.remove("light-theme");
  themeIcon.classList.remove("ri-moon-line");
  themeIcon.classList.add("ri-sun-line");
  themeText.textContent = "Day";
  writeStorage("selected-theme", "dark");
}

if (savedTheme === "light") {
  setLightMode();
} else {
  setDarkMode();
}

themeToggle.addEventListener("click", () => {
  if (document.body.classList.contains("light-theme")) {
    setDarkMode();
  } else {
    setLightMode();
  }
});

//=================== BACK TO TOP BUTTON ===================
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
});

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: reduceMotion.matches ? "auto" : "smooth",
  });
});
