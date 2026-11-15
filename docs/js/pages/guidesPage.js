import { getCurrentLanguage, t } from "../i18n/i18n.js";
import { renderPageLayout } from "../layouts/pageLayout.js";

export async function renderGuidesPage() {
  const app = document.getElementById("app");
  const lang = getCurrentLanguage();

  app.innerHTML = renderPageLayout({
    id: "guides",
    title: t("guides.title"),
    content: `
      <p class="has-text-centered mb-5">${t("guides.welcome")}</p>
      <div class="columns is-multiline" id="guidesGrid"></div>
    `,
  });

  const response = await fetch("./data/guides.json");
  const guides = await response.json();
  const grid = document.getElementById("guidesGrid");

  grid.innerHTML = guides
    .map((g) => {
      const info = g[lang];
      return `
        <div class="column is-12-mobile is-6-tablet is-3-desktop">
          <div class="card" style="height: 100%; display: flex; flex-direction: column;">
            <div class="card-image" style="position: relative;">
              <figure class="image is-4by3">
                <img src="${g.thumbnail}" alt="${info.title}" style="object-fit: cover;" />
              </figure>
              <span class="tag is-dark" style="position: absolute; bottom: 10px; right: 10px;">
                <i class="fas fa-clock mr-1"></i> ${g.duration}
              </span>
            </div>
            <div class="card-content" style="flex-grow: 1; display: flex; flex-direction: column;">
              <p class="title is-6 mb-3">${info.title}</p>
              <div class="notification is-dark is-size-7 p-3 mb-4" style="flex-grow: 1;">
                <p class="has-text-weight-semibold mb-1">${t("guides.stepsTitle")}</p>
                <p>${info.steps}</p>
              </div>
              <button class="button is-primary is-fullwidth watch-guide-btn" data-id="${g.id}">
                <span class="icon"><i class="fas fa-play"></i></span>
                <span>${t("guides.watchBtn")}</span>
              </button>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  document.querySelectorAll(".watch-guide-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const selected = guides.find((item) => item.id === btn.dataset.id);
      if (!selected) return;

      const modalHtml = `
        <div class="modal is-active" id="videoGuideModal">
          <div class="modal-background" id="closeVideoBg"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title is-size-6">${selected[lang].title}</p>
              <button class="delete" id="closeVideoTop"></button>
            </header>
            <section class="modal-card-body">
              <figure class="image is-16by9 mb-3">
                <iframe class="has-ratio" src="${selected.videoUrl}" allowfullscreen></iframe>
              </figure>
              <p class="is-size-7">${selected[lang].steps}</p>
            </section>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML("beforeend", modalHtml);
      const close = () => document.getElementById("videoGuideModal")?.remove();
      document.getElementById("closeVideoBg")?.addEventListener("click", close);
      document.getElementById("closeVideoTop")?.addEventListener("click", close);
    });
  });
}
