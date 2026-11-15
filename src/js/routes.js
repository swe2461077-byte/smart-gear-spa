import { renderOverviewPage } from "./pages/overviewPage.js";
import { renderCatalogPage } from "./pages/catalogPage.js";
import { renderCalculatorPage } from "./pages/calculatorPage.js";
import { renderGuidesPage } from "./pages/guidesPage.js";
import { renderContactPage } from "./pages/contactPage.js";
import { renderNotFoundPage } from "./pages/notFoundPage.js";

export const routes = {
  "#/overview": renderOverviewPage,
  "#/catalog": renderCatalogPage,
  "#/calculator": renderCalculatorPage,
  "#/guides": renderGuidesPage,
  "#/contact": renderContactPage,
  "#/404": renderNotFoundPage,
};
