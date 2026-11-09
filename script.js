const header = document.querySelector(".site-header");
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");
const form = document.querySelector("#signup-form");
const status = document.querySelector("#form-status");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 8);
}, { passive: true });

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});

nav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();

  if (!name || !email || !email.includes("@")) {
    status.textContent = "Ievadi vārdu un derīgu e-pastu.";
    status.className = "form-status err";
    return;
  }

  const entry = {
    name,
    email,
    phone: String(data.get("phone") || "").trim(),
    message: String(data.get("message") || "").trim(),
    createdAt: new Date().toISOString()
  };

  const existing = JSON.parse(localStorage.getItem("runatak-signups") || "[]");
  existing.push(entry);
  localStorage.setItem("runatak-signups", JSON.stringify(existing));

  form.reset();
  form.classList.add("is-sent");
  status.textContent = "Paldies! Mēs ar tevi sazināsimies par nodarbības laiku un vietu.";
  status.className = "form-status ok";
});
