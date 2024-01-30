function updateBreakpointIndicator() {
  const width = window.innerWidth;
  const breakpointIndicator = document.getElementById("breakpoint-indicator");

  if (width >= 1400) {
    breakpointIndicator.textContent = "XXL";
  } else if (width >= 1200) {
    breakpointIndicator.textContent = "XL";
  } else if (width >= 992) {
    breakpointIndicator.textContent = "LG";
  } else if (width >= 768) {
    breakpointIndicator.textContent = "MD";
  } else if (width >= 576) {
    breakpointIndicator.textContent = "SM";
  } else {
    breakpointIndicator.textContent = "XS";
  }
}

window.onresize = updateBreakpointIndicator;
document.addEventListener("DOMContentLoaded", updateBreakpointIndicator);
