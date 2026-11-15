import { getCurrentLanguage, t } from "../i18n/i18n.js";

export function openProductModal(product) {
  const lang = getCurrentLanguage();
  const info = product[lang];
  const categoryLabel = product.category === "home" ? t("catalog.filterHome") : t("catalog.filterCar");

  const existingModal = document.getElementById("productDetailModal");
  if (existingModal) existingModal.remove();

  const modalHtml = `
    <div class="modal is-active" id="productDetailModal">
      <div class="modal-background" id="modalBackdrop"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title is-size-5">${info.name}</p>
          <button class="delete" aria-label="close" id="modalCloseTop"></button>
        </header>
        <section class="modal-card-body">
          <figure class="image is-16by9 mb-4">
            <img src="${product.image}" alt="${info.name}" style="object-fit: cover; border-radius: 8px;" />
          </figure>
          <div class="tags mb-3">
            <span class="tag is-primary is-medium">${categoryLabel}</span>
            <span class="tag is-warning is-medium has-text-weight-bold">${product.price.toLocaleString()}${t("catalog.currency")}</span>
          </div>
          <p class="mb-4">${info.shortDesc}</p>
          <div class="notification is-dark">
            <p class="has-text-weight-semibold mb-1">${t("catalog.specsTitle")}</p>
            <p class="is-size-7">${info.specs}</p>
          </div>
        </section>
        <footer class="modal-card-foot is-justify-content-flex-end">
          <button class="button is-primary" id="modalCloseBottom">${t("catalog.closeBtn")}</button>
        </footer>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHtml);

  const modal = document.getElementById("productDetailModal");
  const closeModal = () => modal?.remove();

  document.getElementById("modalBackdrop")?.addEventListener("click", closeModal);
  document.getElementById("modalCloseTop")?.addEventListener("click", closeModal);
  document.getElementById("modalCloseBottom")?.addEventListener("click", closeModal);
}
