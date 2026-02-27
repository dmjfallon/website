function setLanguage(lang) {
  localStorage.setItem("lang", lang);
  applyLanguage(lang);
}

function applyLanguage(lang) {
  document.querySelectorAll("[data-en]").forEach(el => {
    el.textContent = el.getAttribute("data-" + lang);
  });
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
}

document.addEventListener("DOMContentLoaded", function () {

  const savedLang = localStorage.getItem("lang") || "en";
  applyLanguage(savedLang);

  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);

  // Expand company sections
  document.querySelectorAll(".company-header").forEach(header => {
    header.addEventListener("click", () => {
      header.parentElement.classList.toggle("open");
    });
  });
});