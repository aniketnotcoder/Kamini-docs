const menu = document.querySelector("#menu");
const sidebar = document.querySelector("#sidebar");
const scrim = document.querySelector("#scrim");
function setMenu(open) {
  document.body.classList.toggle("menu-open", open);
  menu?.setAttribute("aria-expanded", String(open));
}
menu?.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
scrim?.addEventListener("click", () => setMenu(false));
document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });
sidebar?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
document.querySelectorAll("[data-copy]").forEach(button => button.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(button.dataset.copy);
    const old = button.textContent; button.textContent = "Copied";
    setTimeout(() => button.textContent = old, 1200);
  } catch { button.textContent = "Copy unavailable"; }
}));
const links = [...document.querySelectorAll("[data-section]")];
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) links.forEach(link => link.classList.toggle("active", link.dataset.section === entry.target.id));
}), { rootMargin: "-20% 0px -70% 0px" });
document.querySelectorAll("main section[id]").forEach(section => observer.observe(section));
