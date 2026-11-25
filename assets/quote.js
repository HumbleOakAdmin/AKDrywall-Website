document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});

document.querySelectorAll("[data-quote]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const note = document.createElement("p");
    note.className = "quote-note";
    note.setAttribute("role", "status");
    note.textContent = "Preview only. This request was not sent. Call 780-263-5193 or email office@akdrywall.ca.";
    form.replaceWith(note);
  });
});
