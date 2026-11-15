import { getCurrentLanguage, t } from "../i18n/i18n.js";
import { renderPageLayout } from "../layouts/pageLayout.js";
import { getProducts } from "../services/productService.js";

export async function renderCalculatorPage() {
  const app = document.getElementById("app");
  const lang = getCurrentLanguage();

  app.innerHTML = renderPageLayout({
    id: "calculator",
    title: t("calculator.title"),
    content: `
      <p class="has-text-centered mb-5">${t("calculator.welcome")}</p>
      <div class="columns">
        <div class="column is-8">
          <div class="table-container">
            <table class="table is-fullwidth is-striped is-hoverable">
              <thead>
                <tr>
                  <th>${t("calculator.productCol")}</th>
                  <th>${t("calculator.priceCol")}</th>
                  <th class="has-text-centered">${t("calculator.qtyCol")}</th>
                  <th class="has-text-right">${t("calculator.subtotalCol")}</th>
                </tr>
              </thead>
              <tbody id="calculatorTableBody"></tbody>
            </table>
          </div>
        </div>
        <div class="column is-4">
          <div class="box" id="calculatorSummaryBox">
            <h3 class="title is-5 mb-4">${t("calculator.summaryTitle")}</h3>
            <div class="is-flex is-justify-content-space-between mb-2">
              <span>${t("calculator.totalItems")}</span>
              <strong id="summaryQty">0</strong>
            </div>
            <div class="is-flex is-justify-content-space-between mb-2">
              <span>${t("calculator.rawTotal")}</span>
              <span id="summaryRaw">0${t("catalog.currency")}</span>
            </div>
            <div class="is-flex is-justify-content-space-between mb-3 has-text-success">
              <span>${t("calculator.discountLabel")}</span>
              <span id="summaryDiscount">-0${t("catalog.currency")}</span>
            </div>
            <div class="notification is-info is-light is-size-7 py-2 px-3 mb-4" id="discountHintBox"></div>
            <hr />
            <div class="is-flex is-justify-content-space-between is-size-5 has-text-weight-bold mb-4">
              <span>${t("calculator.finalTotal")}</span>
              <span class="has-text-warning" id="summaryFinal">0${t("catalog.currency")}</span>
            </div>
            <div class="buttons">
              <a href="#/contact" class="button is-primary is-fullwidth mb-2">
                <span class="icon"><i class="fas fa-shopping-cart"></i></span>
                <span>${t("calculator.orderBtn")}</span>
              </a>
              <button class="button is-light is-fullwidth" id="resetCalcBtn">
                <span class="icon"><i class="fas fa-undo"></i></span>
                <span>${t("calculator.resetBtn")}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `,
  });

  const products = await getProducts();
  const quantities = {};
  products.forEach((p) => (quantities[p.id] = 0));

  const tbody = document.getElementById("calculatorTableBody");

  function updateSummary() {
    let totalQty = 0;
    let rawTotal = 0;

    products.forEach((p) => {
      const q = quantities[p.id];
      totalQty += q;
      rawTotal += q * p.price;
      const rowSub = document.getElementById(`sub-${p.id}`);
      const rowQty = document.getElementById(`qty-${p.id}`);
      if (rowSub) rowSub.textContent = `${(q * p.price).toLocaleString()}${t("catalog.currency")}`;
      if (rowQty) rowQty.textContent = q;
    });

    const discount = totalQty >= 3 ? Math.round(rawTotal * 0.1) : 0;
    const finalTotal = rawTotal - discount;

    document.getElementById("summaryQty").textContent = totalQty;
    document.getElementById("summaryRaw").textContent = `${rawTotal.toLocaleString()}${t("catalog.currency")}`;
    document.getElementById("summaryDiscount").textContent = `-${discount.toLocaleString()}${t("catalog.currency")}`;
    document.getElementById("summaryFinal").textContent = `${finalTotal.toLocaleString()}${t("catalog.currency")}`;

    const hintBox = document.getElementById("discountHintBox");
    if (totalQty >= 3) {
      hintBox.className = "notification is-success is-light is-size-7 py-2 px-3 mb-4";
      hintBox.textContent = "10% VIP!";
    } else {
      hintBox.className = "notification is-info is-light is-size-7 py-2 px-3 mb-4";
      hintBox.textContent = t("calculator.discountHint").replace("{n}", 3 - totalQty);
    }
  }

  tbody.innerHTML = products
    .map(
      (p) => `
      <tr>
        <td>
          <strong>${p[lang].name}</strong>
        </td>
        <td>${p.price.toLocaleString()}${t("catalog.currency")}</td>
        <td class="has-text-centered">
          <div class="buttons has-addons is-centered mb-0">
            <button class="button is-small qty-minus" data-id="${p.id}">-</button>
            <span class="button is-small is-static" id="qty-${p.id}">0</span>
            <button class="button is-small is-primary qty-plus" data-id="${p.id}">+</button>
          </div>
        </td>
        <td class="has-text-right has-text-weight-semibold" id="sub-${p.id}">0${t("catalog.currency")}</td>
      </tr>
    `,
    )
    .join("");

  document.querySelectorAll(".qty-plus").forEach((btn) => {
    btn.addEventListener("click", () => {
      quantities[btn.dataset.id]++;
      updateSummary();
    });
  });

  document.querySelectorAll(".qty-minus").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (quantities[btn.dataset.id] > 0) {
        quantities[btn.dataset.id]--;
        updateSummary();
      }
    });
  });

  document.getElementById("resetCalcBtn")?.addEventListener("click", () => {
    products.forEach((p) => (quantities[p.id] = 0));
    updateSummary();
  });

  updateSummary();
}
