window.onload = function () {
  function wrapLetters(selector) {
    document.querySelectorAll(selector).forEach((element) => {
      // Store the text content and then clear it
      const textContent = element.textContent.trim();
      element.textContent = ""; // Clear the element's content

      // Create spans for each letter and keep them hidden initially
      const spans = [...textContent].map((letter) => {
        const span = document.createElement("span");
        span.textContent = letter;
        span.style.opacity = "0"; // Initially hidden
        return span;
      });

      // Append spans to the element
      spans.forEach((span) => {
        element.appendChild(span);
      });
    });
  }

  wrapLetters(".animate-text");

  const animateLetters = (element) => {
    let index = 0;
    const spans = element.querySelectorAll("span");
    const maxIndex = spans.length;

    const showLetter = () => {
      if (index < maxIndex) {
        spans[index].style.opacity = "1"; // Show the letter
        spans[index].style.color = getRandomColor();
        // spans[index].style.textDecoration = "underline white"; // Underline
        setTimeout(() => {
          spans[index].style.color =
            index < maxIndex - 1 ? "#ffffff" : "#976bff"; // Reset color
          // spans[index].style.textDecoration = "none"; // Remove underline
          index++;
          showLetter();
        }, 50);
      }
    };

    showLetter();
  };

  // Function to get a random color
  function getRandomColor() {
    const hue = Math.floor(Math.random() * 360);
    const saturation = 80 + Math.floor(Math.random() * 21);
    const lightness = 50 + Math.floor(Math.random() * 21);

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          animateLetters(entry.target);
          entry.target.dataset.animated = true; // Mark as animated
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  // Observe elements with the animation class
  document.querySelectorAll(".animate-text").forEach((element) => {
    observer.observe(element);
  });
};
