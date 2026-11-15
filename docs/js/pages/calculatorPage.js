import { t } from "../i18n/i18n.js";
import { renderPageLayout } from "../layouts/pageLayout.js";

export function renderCalculatorPage() {
  const app = document.getElementById("app");
  app.innerHTML = renderPageLayout({
    id: "calculator",
    title: t("calculator.title"),
    content: `<p class="has-text-centered">${t("calculator.welcome")}</p>`,
  });
}
