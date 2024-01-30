document.addEventListener("DOMContentLoaded", () => {
  // Function to load a component into a placeholder
  function loadComponent(componentPath, placeholderId) {
    fetch(componentPath)
      .then((response) => response.text())
      .then((data) => {
        document.getElementById(placeholderId).innerHTML = data;
      })
      .catch((err) => console.error(`Failed to load ${componentPath}:`, err));
  }

  // Load the navbar
  loadComponent("components/navbar.html", "navbar-placeholder");
  console.log("Loaded navbar component");

  // (Load other components) ------------------------------------
});
