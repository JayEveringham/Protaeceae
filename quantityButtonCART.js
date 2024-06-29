document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (event) => {
    // Check if a quantity button was clicked
    if (
      event.target.matches(".btn-quantity-plus") ||
      event.target.matches(".btn-quantity-minus")
    ) {
      event.preventDefault();

      // Find closest cart item and its product ID
      const cartItem = event.target.closest(".cart-item");
      const productId = cartItem.dataset.productId;

      // Parse current quantity and unit price
      let quantity = parseInt(
        cartItem.querySelector("[data-product-quantity]").textContent,
        10
      );
      const pricePerItem = parseFloat(
        cartItem
          .querySelector("[data-product-price]")
          .textContent.replace("$", "")
      );

      // Adjust quantity based on which button was pressed
      if (event.target.matches(".btn-quantity-plus")) {
        quantity++;
      } else if (event.target.matches(".btn-quantity-minus") && quantity > 0) {
        quantity--;
      }

      // Update quantity and subtotal in the cart item
      cartItem.querySelectorAll(".quantity-display").forEach((el) => {
        el.textContent = quantity; // Update quantity
      });
      const newSubtotal = (quantity * pricePerItem).toFixed(2);
      cartItem.querySelectorAll(".subtotal").forEach((el) => {
        el.textContent = `$${newSubtotal}`; // Update subtotal
      });

      // Update corresponding summary section
      const summaryItem = document.querySelector(
        `.summary-item[data-product-id="${productId}"]`
      );
      if (summaryItem) {
        summaryItem.querySelector(".summary-quantity").textContent = quantity; // Update quantity in summary
        summaryItem.querySelector(
          ".summary-price"
        ).textContent = `$${newSubtotal}`; // Update price in summary
      }

      // Recalculate and update overall totals
      updateOverallTotals();
    }
  });

  function updateOverallTotals() {
    let total = 0;
    // Select all summary-price elements within the summary-item rows
    document
      .querySelectorAll(".summary-item .summary-price")
      .forEach((priceElement) => {
        const price = parseFloat(priceElement.textContent.replace("$", ""));
        total += price;
      });

    // Update the overall subtotal in the summary section
    const overallSubtotalElement = document.querySelector(".overall-subtotal");
    if (overallSubtotalElement) {
      overallSubtotalElement.textContent = `$${total.toFixed(2)}`;
    }

    // Assuming a fixed GST rate for simplicity; adjust calculation as necessary
    const gst = total * 0.1; // Example GST rate of 10%
    const gstElement = document.querySelector(".gst");
    if (gstElement) {
      gstElement.textContent = `$${gst.toFixed(2)}`;
    }

    const shippingFee = 35; // Fixed shipping fee
    const finalTotal = total + gst + shippingFee; // Include shipping fee in the final total
    const totalElement = document.querySelector(".total");
    if (totalElement) {
      totalElement.textContent = `$${finalTotal.toFixed(2)}`;
    }
  }
});
