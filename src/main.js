// Quote form: builds a WhatsApp message from the fields and opens it.
const form = document.getElementById("quote");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(form);
    const lines = [
      `Hello, my name is ${d.get("name")}.`,
      `I need: ${d.get("type")}.`,
      d.get("size") ? `Size and location: ${d.get("size")}.` : "",
      d.get("details") ? `Details: ${d.get("details")}` : "",
    ].filter(Boolean);
    const url = `https://wa.me/${form.dataset.wa}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener");
  });
}
