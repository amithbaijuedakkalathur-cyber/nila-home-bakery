const form = document.querySelector("#order-form");
const cakeField = form.elements.namedItem("cake");
const sizeField = form.elements.namedItem("size");
const nameField = form.elements.namedItem("customer-name");
const dateField = form.elements.namedItem("preferred-date");
const notesField = form.elements.namedItem("notes");
const priceOutput = document.querySelector("#price");
const whatsappContact = document.querySelector("#whatsapp-contact").href;
const cakes = {};

for (const card of document.querySelectorAll("[data-cake]")) {
  const cakeId = card.dataset.cake;
  const name = card.querySelector("h3").textContent;
  const prices = {};

  for (const price of card.querySelectorAll("[data-size]")) {
    prices[price.dataset.size] = price.textContent.trim();
  }

  cakes[cakeId] = { name, prices };
  cakeField.add(new Option(name, cakeId));

  const chooseButton = card.querySelector(".choose-cake");
  chooseButton.addEventListener("click", () => {
    cakeField.value = cakeId;
    updatePrice();
    sizeField.focus({ preventScroll: true });
    document.querySelector("#order").scrollIntoView();
  });
  chooseButton.hidden = false;
}

function updatePrice() {
  const cake = cakes[cakeField.value];
  priceOutput.value = cake?.prices[sizeField.value] ?? "—";
}

function whatsappLink(message) {
  return `${whatsappContact}?text=${encodeURIComponent(message)}`;
}

const bakeryDate = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

function updateDateMinimum() {
  const parts = bakeryDate.formatToParts(new Date());
  const { year, month, day } = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  dateField.min = `${year}-${month}-${day}`;
}

cakeField.addEventListener("change", updatePrice);
sizeField.addEventListener("change", updatePrice);
dateField.addEventListener("focus", updateDateMinimum);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  updateDateMinimum();
  if (!form.reportValidity()) return;

  const cake = cakes[cakeField.value];
  const size = sizeField.selectedOptions[0].textContent;
  const date = dateField.valueAsDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
  const lines = [
    "Hi Nila Home Bakery! I'd like to order a cake.",
    "",
    `Name: ${nameField.value.trim()}`,
    `Cake: ${cake.name}`,
    `Size: ${size}`,
    `Cake price: ${cake.prices[sizeField.value]}`,
    `Preferred date: ${date}`,
  ];
  const notes = notesField.value.trim();
  if (notes) lines.push(`Notes: ${notes}`);

  // WhatsApp opens with the text filled in. The customer taps Send there.
  window.location.assign(whatsappLink(lines.join("\n")));
});

document.querySelector("#plum-enquiry").href = whatsappLink(
  "Hi Nila Home Bakery! I'd like to enquire about Christmas plum cake availability."
);

window.addEventListener("pageshow", () => {
  updateDateMinimum();
  updatePrice();
});

updateDateMinimum();
updatePrice();
form.hidden = false;
