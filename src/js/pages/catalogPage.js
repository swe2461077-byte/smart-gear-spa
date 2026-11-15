import { t } from "../i18n/i18n.js";
import { renderPageLayout } from "../layouts/pageLayout.js";

export function renderCatalogPage() {
  const app = document.getElementById("app");
  app.innerHTML = renderPageLayout({
    id: "catalog",
    title: t("catalog.title"),
    content: `<p class="has-text-centered">${t("catalog.welcome")}</p>`,
  });
}
