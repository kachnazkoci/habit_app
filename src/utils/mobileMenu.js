import { setScreen } from "../state.js";

let menuOpen = false;

export function initMobileMenu(rerender) {
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");

  if (!btn || !menu) return;

  /* otevření / zavření */
  btn.onclick = () => {
    menuOpen = !menuOpen;
    menu.classList.toggle("hidden", !menuOpen);
  };

  /* klik na položku menu */
  menu.querySelectorAll("button").forEach(button => {
    button.onclick = () => {
      const screen = button.dataset.screen;
      setScreen(screen);
      menuOpen = false;
      menu.classList.add("hidden");
      rerender();
    };
  });
}
