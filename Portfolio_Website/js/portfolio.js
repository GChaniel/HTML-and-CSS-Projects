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
      });

      const activeLink = document.querySelector(
        '.nav_link[href*="' + sectionId + '"]',
      );

      if (activeLink) {
        activeLink.classList.add("active-link");
      }
    }
  });
}

window.addEventListener("scroll", activeLinkOnScroll);
activeLinkOnScroll();

//================== CLOSE MOBILE MENU AFTER CLICK ==================
const navToggle = document.getElementById("nav-toggle");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.checked = false;
  });
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

//=================== TYPING TEXT EFFECT ===============
const typingText = document.getElementById("typing-text");

const roles = [
  "Web & Software Developer",
  "Frontend Developer",
  "Creative Technologist",
  "Problem Solver",
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typingText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1200);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();

// ================= PORTFOLIO FILTER =================
const filterButtons = document.querySelectorAll(".filter_btn");
const portfolioCards = document.querySelectorAll(
  ".portfolio_card[data-category]",
);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filterValue = button.getAttribute("data-filter");

    portfolioCards.forEach((card) => {
      const cardCategory = card.getAttribute("data-category");

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
  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const projectTitle = contactForm.project_title.value.trim();
  const message = contactForm.message.value.trim();

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (name === "" || email === "" || projectTitle === "" || message === "") {
    event.preventDefault();
    contactMessage.textContent = "Please fill in all fields.";
    contactMessage.classList.add("error");
    return;
  }

  if (!email.match(emailPattern)) {
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

const savedTheme = localStorage.getItem("selected-theme");

function setLightMode() {
  document.body.classList.add("light-theme");
  themeIcon.classList.remove("ri-sun-line");
  themeIcon.classList.add("ri-moon-line");
  themeText.textContent = "Night";
  localStorage.setItem("selected-theme", "light");
}

function setDarkMode() {
  document.body.classList.remove("light-theme");
  themeIcon.classList.remove("ri-moon-line");
  themeIcon.classList.add("ri-sun-line");
  themeText.textContent = "Day";
  localStorage.setItem("selected-theme", "dark");
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
    behavior: "smooth",
  });
});
