document.addEventListener("DOMContentLoaded", () => {
  const minusButtons = document.querySelectorAll(".btn-quantity-minus");
  const plusButtons = document.querySelectorAll(".btn-quantity-plus");
  const quantityDisplays = document.querySelectorAll(".quantity");

  function updateMinusButtonState(quantityDisplay, minusButton) {
    const quantity = parseInt(quantityDisplay.textContent, 10);
    if (quantity < 1) {
      minusButton.classList.add("disabled");
    } else {
      minusButton.classList.remove("disabled");
    }
  }

  minusButtons.forEach((minusButton, index) => {
    // Initial state update for minus button
    updateMinusButtonState(quantityDisplays[index], minusButton);

    minusButton.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default anchor behavior
      let quantity = parseInt(quantityDisplays[index].textContent, 10);
      if (quantity > 0) {
        quantityDisplays[index].textContent = quantity - 1;
      }
      updateMinusButtonState(quantityDisplays[index], minusButton);
    });
  });

  plusButtons.forEach((plusButton, index) => {
    plusButton.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default anchor behavior
      let quantity = parseInt(quantityDisplays[index].textContent, 10);
      quantityDisplays[index].textContent = quantity + 1;
      updateMinusButtonState(quantityDisplays[index], minusButtons[index]);
    });
  });
});
