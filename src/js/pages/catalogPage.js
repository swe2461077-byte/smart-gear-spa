import { getCurrentLanguage, t } from "../i18n/i18n.js";
import { renderPageLayout } from "../layouts/pageLayout.js";
import { getProducts } from "../services/productService.js";
import { openProductModal } from "../components/productModal.js";

export async function renderCatalogPage() {
  const app = document.getElementById("app");
  const lang = getCurrentLanguage();

  app.innerHTML = renderPageLayout({
    id: "catalog",
    title: t("catalog.title"),
    content: `
      <p class="has-text-centered mb-5">${t("catalog.welcome")}</p>
      
      <div class="columns is-vcentered mb-5">
        <div class="column is-6">
          <div class="buttons has-addons">
            <button class="button is-primary filter-btn" data-category="all">${t("catalog.filterAll")}</button>
            <button class="button filter-btn" data-category="home">
              <span class="icon is-small"><i class="fas fa-home"></i></span>
              <span>${t("catalog.filterHome")}</span>
            </button>
            <button class="button filter-btn" data-category="car">
              <span class="icon is-small"><i class="fas fa-car"></i></span>
              <span>${t("catalog.filterCar")}</span>
            </button>
          </div>
        </div>
        <div class="column is-6">
          <div class="control has-icons-left">
            <input class="input" type="text" id="productSearchInput" placeholder="${t("catalog.searchPlaceholder")}" />
            <span class="icon is-left">
              <i class="fas fa-search"></i>
            </span>
          </div>
        </div>
      </div>

      <div class="columns is-multiline" id="productGrid">
        <div class="column is-12 has-text-centered">
          <span class="icon is-large has-text-primary"><i class="fas fa-spinner fa-pulse fa-2x"></i></span>
        </div>
      </div>
    `,
  });

  try {
    const products = await getProducts();
    let currentCategory = "all";
    let searchQuery = "";

    const grid = document.getElementById("productGrid");
    const searchInput = document.getElementById("productSearchInput");
    const filterButtons = document.querySelectorAll(".filter-btn");

    function renderGrid() {
      const filtered = products.filter((item) => {
        const matchesCategory = currentCategory === "all" || item.category === currentCategory;
        const name = item[lang].name.toLowerCase();
        const desc = item[lang].shortDesc.toLowerCase();
        const matchesSearch = name.includes(searchQuery) || desc.includes(searchQuery);
        return matchesCategory && matchesSearch;
      });

      if (filtered.length === 0) {
        grid.innerHTML = `<div class="column is-12 has-text-centered"><p class="has-text-grey">${t("catalog.noResults")}</p></div>`;
        return;
      }

      grid.innerHTML = filtered
        .map((product) => {
          const info = product[lang];
          const badgeIcon = product.category === "home" ? "fa-home" : "fa-car";
          const badgeText = product.category === "home" ? t("catalog.filterHome") : t("catalog.filterCar");

          return `
            <div class="column is-12-mobile is-6-tablet is-3-desktop">
              <div class="card app-product-card" style="height: 100%; display: flex; flex-direction: column;">
                <div class="card-image">
                  <figure class="image is-4by3">
                    <img src="${product.image}" alt="${info.name}" style="object-fit: cover;" />
                  </figure>
                </div>
                <div class="card-content" style="flex-grow: 1; display: flex; flex-direction: column;">
                  <div class="mb-2">
                    <span class="tag is-info is-light">
                      <i class="fas ${badgeIcon} mr-1"></i> ${badgeText}
                    </span>
                  </div>
                  <p class="title is-6 mb-2">${info.name}</p>
                  <p class="is-size-7 mb-4" style="flex-grow: 1;">${info.shortDesc}</p>
                  <div class="is-flex is-justify-content-space-between is-align-items-center mt-auto pt-3" style="border-top: 1px solid rgba(128,128,128,0.2);">
                    <span class="has-text-weight-bold has-text-warning is-size-6">
                      ${product.price.toLocaleString()}${t("catalog.currency")}
                    </span>
                    <button class="button is-small is-primary view-details-btn" data-id="${product.id}">
                      ${t("catalog.detailsBtn")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `;
        })
        .join("");

      document.querySelectorAll(".view-details-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const selected = products.find((p) => p.id === btn.dataset.id);
          if (selected) openProductModal(selected);
        });
      });
    }

    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("is-primary"));
        btn.classList.add("is-primary");
        currentCategory = btn.dataset.category;
        renderGrid();
      });
    });

    searchInput?.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      renderGrid();
    });

    renderGrid();
  } catch (error) {
    console.error(error);
  }
}
