import { t } from "../i18n/i18n.js";
import { renderPageLayout } from "../layouts/pageLayout.js";

export function renderContactPage() {
  const app = document.getElementById("app");
  app.innerHTML = renderPageLayout({
    id: "contact",
    title: t("contact.title"),
    content: `
      <p class="has-text-centered mb-5">${t("contact.welcome")}</p>
      <div class="columns is-centered">
        <div class="column is-5">
          <div class="box" style="height: 100%;">
            <p class="mb-4">
              <span class="icon has-text-primary mr-2"><i class="fas fa-map-marker-alt"></i></span>
              <strong>${t("contact.addressLabel")}</strong><br />
              <span class="ml-5">${t("contact.addressValue")}</span>
            </p>
            <p class="mb-4">
              <span class="icon has-text-success mr-2"><i class="fas fa-phone"></i></span>
              <strong>${t("contact.phoneLabel")}</strong><br />
              <span class="ml-5">${t("contact.phoneValue")}</span>
            </p>
            <p class="mb-4">
              <span class="icon has-text-warning mr-2"><i class="fas fa-clock"></i></span>
              <strong>${t("contact.hoursLabel")}</strong><br />
              <span class="ml-5">${t("contact.hoursValue")}</span>
            </p>
          </div>
        </div>

        <div class="column is-6">
          <div class="box">
            <form id="contactOrderForm">
              <div class="field">
                <label class="label">${t("contact.nameLabel")}</label>
                <div class="control has-icons-left">
                  <input class="input" type="text" required placeholder="${t("contact.namePlaceholder")}" />
                  <span class="icon is-small is-left"><i class="fas fa-user"></i></span>
                </div>
              </div>

              <div class="field">
                <label class="label">${t("contact.phoneInputLabel")}</label>
                <div class="control has-icons-left">
                  <input class="input" type="tel" required placeholder="${t("contact.phonePlaceholder")}" />
                  <span class="icon is-small is-left"><i class="fas fa-phone"></i></span>
                </div>
              </div>

              <div class="field">
                <label class="label">${t("contact.messageLabel")}</label>
                <div class="control">
                  <textarea class="textarea" rows="3" required placeholder="${t("contact.messagePlaceholder")}"></textarea>
                </div>
              </div>

              <button type="submit" class="button is-primary is-fullwidth">
                <span class="icon"><i class="fas fa-paper-plane"></i></span>
                <span>${t("contact.submitBtn")}</span>
              </button>
            </form>
            <div class="notification is-success mt-4 is-hidden" id="contactSuccessAlert">
              ${t("contact.successMsg")}
            </div>
          </div>
        </div>
      </div>
    `,
  });

  const form = document.getElementById("contactOrderForm");
  const alertBox = document.getElementById("contactSuccessAlert");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    form.reset();
    alertBox?.classList.remove("is-hidden");
  });
}
