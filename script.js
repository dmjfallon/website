function setLanguage(lang) {
  localStorage.setItem("lang", lang);
  applyLanguage(lang);
}

function applyLanguage(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-en]").forEach(el => {
    const value = el.getAttribute("data-" + lang) || "";
    if (/[<>&]/.test(value)) {
      el.innerHTML = value;
    } else {
      el.textContent = value;
    }
  });

  const localizedTitle = document.body?.getAttribute("data-title-" + lang);
  if (localizedTitle) {
    document.title = localizedTitle;
  }

  updateClocks(lang);
}

function formatTime(timeZone, lang) {
  return new Intl.DateTimeFormat(lang === "es" ? "es-ES" : "en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone
  }).format(new Date());
}

function updateClocks(lang) {
  document.querySelectorAll("[data-uy-time]").forEach(el => {
    el.textContent = formatTime("America/Montevideo", lang);
  });

  document.querySelectorAll("[data-local-time]").forEach(el => {
    const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    el.textContent = formatTime(localTimeZone, lang);
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

  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);

  updateFavicon(savedTheme);
  updateThemeToggleIcon(savedTheme);
  updateClocks(savedLang);

  setInterval(() => {
    const currentLang = localStorage.getItem("lang") || "en";
    updateClocks(currentLang);
  }, 30000);

  // Expand company sections
  document.querySelectorAll(".company").forEach(company => {
    company.addEventListener("click", event => {
      if (event.target.closest(".company-link")) return;
      company.classList.toggle("open");
    });
  });

  document.querySelectorAll(".section-trigger").forEach(trigger => {
    trigger.addEventListener("click", () => {
      trigger.parentElement.classList.toggle("open");
    });
  });
});
