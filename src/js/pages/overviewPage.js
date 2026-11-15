import { t } from "../i18n/i18n.js";
import { renderPageLayout } from "../layouts/pageLayout.js";

export function renderOverviewPage() {
  const app = document.getElementById("app");
  app.innerHTML = renderPageLayout({
    id: "overview",
    title: t("overview.title"),
    content: `
      <div class="has-text-centered mb-6">
        <p class="is-size-5 mb-5">${t("overview.welcome")}</p>
        <div class="buttons is-centered">
          <a href="#/catalog" class="button is-primary is-medium">
            <span class="icon"><i class="fas fa-microchip"></i></span>
            <span>${t("overview.ctaCatalog")}</span>
          </a>
          <a href="#/calculator" class="button is-link is-outlined is-medium">
            <span class="icon"><i class="fas fa-calculator"></i></span>
            <span>${t("overview.ctaCalculator")}</span>
          </a>
        </div>
      </div>

      <div class="columns is-multiline mt-5">
        <div class="column is-4">
          <div class="box has-text-centered" style="height: 100%;">
            <span class="icon is-large has-text-info mb-3"><i class="fas fa-home fa-2x"></i></span>
            <h3 class="title is-5">${t("overview.feature1Title")}</h3>
            <p class="is-size-6">${t("overview.feature1Desc")}</p>
          </div>
        </div>
        <div class="column is-4">
          <div class="box has-text-centered" style="height: 100%;">
            <span class="icon is-large has-text-warning mb-3"><i class="fas fa-car fa-2x"></i></span>
            <h3 class="title is-5">${t("overview.feature2Title")}</h3>
            <p class="is-size-6">${t("overview.feature2Desc")}</p>
          </div>
        </div>
        <div class="column is-4">
          <div class="box has-text-centered" style="height: 100%;">
            <span class="icon is-large has-text-primary mb-3"><i class="fas fa-bolt fa-2x"></i></span>
            <h3 class="title is-5">${t("overview.feature3Title")}</h3>
            <p class="is-size-6">${t("overview.feature3Desc")}</p>
          </div>
        </div>
      </div>
    `,
  });
}
