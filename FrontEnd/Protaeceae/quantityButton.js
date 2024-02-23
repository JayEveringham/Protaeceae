// Quantity button functionality

document.addEventListener("DOMContentLoaded", () => {
  const minusButton = document.querySelector(".btn-quantity-minus");
  const plusButton = document.querySelector(".btn-quantity-plus");
  const quantityDisplay = document.querySelector(".quantity");

  function updateMinusButtonState() {
    const quantity = parseInt(quantityDisplay.textContent, 10);
    if (quantity <= 1) {
      minusButton.classList.add("disabled");
    } else {
      minusButton.classList.remove("disabled");
    }
  }

  // Initial state update for minus button
  updateMinusButtonState();

  minusButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default anchor behavior
    let quantity = parseInt(quantityDisplay.textContent, 10);
    if (quantity > 1) {
      quantityDisplay.textContent = quantity - 1;
    }
    updateMinusButtonState();
  });

  plusButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default anchor behavior
    let quantity = parseInt(quantityDisplay.textContent, 10);
    quantityDisplay.textContent = quantity + 1;
    updateMinusButtonState();
  });
});
