import { t } from "../i18n/i18n.js";
import { renderPageLayout } from "../layouts/pageLayout.js";

export function renderGuidesPage() {
  const app = document.getElementById("app");
  app.innerHTML = renderPageLayout({
    id: "guides",
    title: t("guides.title"),
    content: `<p class="has-text-centered">${t("guides.welcome")}</p>`,
  });
}
