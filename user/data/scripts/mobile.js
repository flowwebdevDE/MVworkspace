document.addEventListener("DOMContentLoaded", function() {
  const menuToggle = document.createElement("div");
  menuToggle.classList.add("menu-toggle");
  menuToggle.innerHTML = "☰"; // Hamburger-Symbol
  document.querySelector("header").prepend(menuToggle);

  const sidebar = document.querySelector(".sidebar");

  // Menü öffnen/schließen
  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });

  // Sidebar schließen, wenn Link geklickt wird
  sidebar.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      sidebar.classList.remove("active");
    });
  });
});