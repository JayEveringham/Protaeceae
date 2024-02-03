async function loadComponent(componentPath, placeholderId) {
  const response = await fetch(componentPath);
  const html = await response.text();
  document.getElementById(placeholderId).innerHTML = html;
}

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("footer.html", "footer-placeholder");
});
