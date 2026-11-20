const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

menuButton?.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navigation?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

// Enquiry is composed in the visitor's WhatsApp app; no form data is stored.
document.getElementById("enquiry-form")?.addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const fields = [
    ["Name", form.get("name")],
    ["Phone", form.get("phone")],
    ["Event", form.get("event")],
    ["Preferred date", form.get("date") || "Not specified"],
    ["Expected guests", form.get("guests") || "Not specified"]
  ];
  const message = "Hello Narmada Garden, I would like to enquire about an event.%0A%0A" +
    fields.map(([label, value]) => `${label}: ${value}`).join("%0A");
  window.open(`https://wa.me/919437032861?text=${encodeURIComponent(
    "Hello Narmada Garden, I would like to enquire about an event.\n\n" +
    fields.map(([label, value]) => `${label}: ${value}`).join("\n")
  )}`, "_blank", "noopener");
});

// Tap a gallery image to view it larger.
const lightbox = document.getElementById("lightbox");
const lightboxImage = lightbox?.querySelector("img");
document.querySelectorAll(".gallery-item").forEach(item => {
  item.addEventListener("click", () => {
    lightboxImage.src = item.dataset.full;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  });
});
function closeLightbox() {
  lightbox?.classList.remove("open");
  lightbox?.setAttribute("aria-hidden", "true");
  if (lightboxImage) lightboxImage.src = "";
}
lightbox?.querySelector(".lightbox-close")?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", event => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeLightbox();
});
