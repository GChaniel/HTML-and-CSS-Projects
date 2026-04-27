//================================================================
// LIGHTBOX GALLERY FUNCTIONALITY
//================================================================
//this script handles the interactive image gallery
// It allows the users to:
// 1. Click on the gallery image to open it in the lightbox modal.
// 2. Navigate between images using the next/prev buttons
// 3. Close the lightbox using the close button or background click

// Get all required DOM element
const photos = document.querySelectorAll(".photo");
const images = document.querySelectorAll(".gallery-img");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");

const closeBtn = document.getElementById("closeBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

// Track the currently active image index
let currentIndex = 0;

//This opens the lightbox when you click the image
photos.forEach((photo, index) => {
  photo.addEventListener("click", () => {
    currentIndex = index;
    lightboxImage.src = images[currentIndex].src;

    lightbox.classList.add("show");
  });
});

//Lightbox controls the close, next and previous
closeBtn.addEventListener("click", () => {
  lightbox.classList.remove("show");
});

//The next button
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  lightboxImage.src = images[currentIndex].src;
});

//the Prev Button
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lightboxImage.src = images[currentIndex].src;
});

//click outside to close
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("show");
  }
});
