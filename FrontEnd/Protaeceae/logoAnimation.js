// Logo Animation
console.log("Starting animation");
const container = document.getElementById("logo-text");
const word = container.textContent;
container.innerHTML = ""; // Clear the original text

// Wrap each letter in a span and append it to the container
[...word].forEach((letter) => {
  const span = document.createElement("span");
  span.textContent = letter;
  container.appendChild(span);
});

const letters = container.querySelectorAll("span");
let index = 0;

function getRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 80 + Math.floor(Math.random() * 21);
  const lightness = 50 + Math.floor(Math.random() * 21);

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

// SVG line colour change
function applyColorToStrand(color, index) {
  const lineIndex = 4 - (index % 4); // cycle over lines
  const selectedLines = document.querySelectorAll(`.line-${lineIndex}`);

  selectedLines.forEach((line) => {
    line.style.stroke = color;
  });
}

const changeLetterColor = () => {
  // Reset all lines to white
  document.querySelectorAll(".cls-1").forEach((line) => {
    line.style.stroke = "#ffffff";
  });

  if (index > 0 && index < letters.length - 1) {
    // Reset the previous letter's color
    letters[index - 1].style.color = "#ffffff";
  }

  if (index < letters.length - 1) {
    if (index == 8) {
      //keep the last 'a' purple
      letters[8].style.color = "#976bff";
    } else {
      letters[index].style.color = getRandomColor();
    }
    applyColorToStrand(getRandomColor(), index + 1);

    // Move to the next letter after a delay
    setTimeout(changeLetterColor, 100);
    index++;
  } else {
    // Last letter
    letters[8].textContent = "æ";
    letters[9].remove();
    letters[8].style.color = "#976bff";
    applyColorToStrand("#976bff", index);
  }
};

// Start changing letters' color
setTimeout(changeLetterColor, 0);
