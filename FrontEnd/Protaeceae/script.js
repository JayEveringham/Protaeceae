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

  // Carousel initialization
  var myCarousel = document.querySelector("#homeCarousel");
  var carousel = new bootstrap.Carousel(myCarousel, {
    interval: 3000,
    wrap: true,
  });
});
