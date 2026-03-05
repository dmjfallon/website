function setLanguage(lang) {
  localStorage.setItem("lang", lang);
  applyLanguage(lang);
}

function applyLanguage(lang) {
  document.querySelectorAll("[data-en]").forEach(el => {
    const value = el.getAttribute("data-" + lang) || "";
    if (value.includes("<br>")) {
      el.innerHTML = value;
    } else {
      el.textContent = value;
    }
  });
}

function updateFavicon(theme) {
  const favicon = document.getElementById("favicon");
  if (!favicon) return;

  if (theme === "dark") {
    favicon.href = "images/favicondark.png";
  } else {
    favicon.href = "images/faviconlight.png";
  }
}

function updateThemeToggleIcon(theme) {
  document.querySelectorAll("[data-theme-toggle]").forEach(el => {
    el.textContent = theme === "dark" ? "☀" : "☾";
  });
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);

  updateFavicon(next);
  updateThemeToggleIcon(next);
}

document.addEventListener("DOMContentLoaded", function () {

  const savedLang = localStorage.getItem("lang") || "en";
  applyLanguage(savedLang);

  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);

  updateFavicon(savedTheme);
  updateThemeToggleIcon(savedTheme);

  // Expand company sections
  document.querySelectorAll(".company-header").forEach(header => {
    header.addEventListener("click", () => {
      header.parentElement.classList.toggle("open");
    });
  });

  const fitTrigger = document.querySelector(".fit-trigger");
  const fitSection = document.querySelector(".fit-section");
  if (fitTrigger && fitSection) {
    fitTrigger.addEventListener("click", () => {
      fitSection.classList.toggle("open");
    });
  }
});
