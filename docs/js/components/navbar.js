import { t, toggleLanguage } from "../i18n/i18n.js";

export function renderNavbar() {
  return `
    <header class="app-sticky app-shadow">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="container">
          <div class="navbar-brand">
            <a class="navbar-item has-text-weight-bold is-uppercase app-logo" href="#/overview">
              <span class="icon is-medium has-text-primary mr-2">
                <i class="fas fa-bolt fa-lg"></i>
              </span>
              <p><span>${t("nav.brandSpan")}</span> ${t("nav.brand")}</p>
            </a>
            <a class="navbar-burger" role="button" aria-expanded="false" data-target="topNavbar">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div class="navbar-menu has-text-weight-semibold has-text-centered" id="topNavbar">
            <div class="navbar-start app-top-navbar-right">
              <a class="navbar-item" href="#/overview">
                <span class="icon has-text-info"><i class="fas fa-home"></i></span>
                <span>${t("nav.overview")}</span>
              </a>
              <a class="navbar-item" href="#/catalog">
                <span class="icon has-text-primary"><i class="fas fa-microchip"></i></span>
                <span>${t("nav.catalog")}</span>
              </a>
              <a class="navbar-item" href="#/calculator">
                <span class="icon has-text-link"><i class="fas fa-calculator"></i></span>
                <span>${t("nav.calculator")}</span>
              </a>
              <a class="navbar-item" href="#/guides">
                <span class="icon has-text-warning"><i class="fas fa-play-circle"></i></span>
                <span>${t("nav.guides")}</span>
              </a>
              <a class="navbar-item" href="#/contact">
                <span class="icon has-text-danger"><i class="fas fa-headset"></i></span>
                <span>${t("nav.contact")}</span>
              </a>
            </div>
            <div class="navbar-end">
              <a class="navbar-item" href="#" id="langToggle">${t("nav.language")}</a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  `;
}

export function initNavbar() {
  const burger = document.querySelector(".navbar-burger");
  const languageToggle = document.getElementById("langToggle");
  if (!burger) return;

  const targetId = burger.dataset.target;
  const menu = document.getElementById(targetId);
  const navLinks = menu?.querySelectorAll(".navbar-item[href^='#/']");

  function toggleMenu() {
    burger.classList.toggle("is-active");
    menu?.classList.toggle("is-active");
    burger.setAttribute("aria-expanded", String(burger.classList.contains("is-active")));
  }

  burger.addEventListener("click", toggleMenu);

  navLinks?.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 1023) {
        burger.classList.remove("is-active");
        menu?.classList.remove("is-active");
      }
    });
  });

  if (languageToggle) {
    languageToggle.addEventListener("click", (event) => {
      event.preventDefault();
      toggleLanguage();
      window.location.reload();
    });
  }
}

export function mountNavbar(root) {
  if (!root) return;
  root.innerHTML = renderNavbar();
  initNavbar();
}
