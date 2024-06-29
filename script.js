document.addEventListener("DOMContentLoaded", function () {
  //   Blur observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: [0.1] }
  ); // Adjust the threshold as needed

  const divs = document.querySelectorAll(".blur-background");
  divs.forEach((div) => {
    observer.observe(div);
  });

  // // Carousel initialization
  // var myCarousel = document.querySelector("#homeCarousel");
  // var carousel = new bootstrap.Carousel(myCarousel, {
  //   interval: 3000,
  //   wrap: true,
  // });
});

// // Make Navbar Opaque After Scrolling Down X Pixels
// const navbar = document.querySelector(".navbar");

// // Function to adjust navbar opacity
// function adjustNavbarOpacity() {
//   const scrollThreshold = 10;

//   if (window.scrollY > scrollThreshold) {
//     navbar.style.backgroundColor = "rgba(24, 32, 17, 1)";
//   } else {
//     navbar.style.backgroundColor = "rgba(255, 0, 0, 0)";
//   }
// }

// TOGGLE HEART
document.querySelectorAll(".toggle-heart").forEach((item) => {
  item.addEventListener("click", function () {
    this.src = this.src.includes("heart.svg")
      ? "SVG/heart-filled.svg"
      : "SVG/heart.svg";
    console.log("clicked");
  });
});

// Scale up and down cards on touch
document.querySelectorAll(".species-cards .card").forEach((card) => {
  card.addEventListener("touchstart", function () {
    // Scale up when touched
    this.style.transform = "scale(1.05)";
  });

  card.addEventListener("touchend", function () {
    // Scale back down when touch ends
    this.style.transform = "scale(1)";
  });
});
