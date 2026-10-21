import { setScreen } from "../state.js";
import { searchKnowHowTopics } from "./knowhow.js";
import { mantras } from "../data/mantras.js";

const tiles = [
  { topic: "plate", title: "Výživa", subtitle: "Jak si sestavit talíř", text: "Pestré jídlo bez počítání každého gramu.", image: "assets/plate-layout-highres.png", label: "Jídlo", icon: "♧" },
  { topic: "walking", title: "Pohyb", subtitle: "Chůze", text: "Aktivní život v každodenním tempu.", image: "assets/pohyb-visual.png", label: "Pohyb", icon: "⌁" },
  { topic: "circuit", title: "Silový trénink", subtitle: "Kruhový trénink", text: "Síla a kondice.", image: "assets/strength-katerina-final.png", label: "Trénink", icon: "⚯" },
  { topic: "routine-90-10", title: "Návyky", subtitle: "Pravidlo 90/10", text: "Malé kroky, velké změny.", image: "assets/routine-90-10-home.png", label: "Návyky", icon: "♧" },
  { topic: "nighttime-cortisol", title: "Spánek", subtitle: "Malé návyky, které podporují zdraví", text: "Více energie a prostor pro regeneraci.", image: "assets/spanek-visual.png", label: "Spánek", icon: "☾" },
  { topic: "relationships", title: "Vztahy", subtitle: "Vztahy a blízkost", text: "Podpora a sdílený čas.", image: "assets/srdce-les.png", label: "Vztahy", icon: "♡" },
  { topic: "emotions", title: "Emoce", subtitle: "Emoce a zklidnění", text: "Najdi chvíli pro sebe.", image: "assets/emotions-autumn-tea.png", label: "Pohoda", icon: "❀" },
  { topic: "habit-stacking", title: "Tipy", subtitle: "Habit Stacking – Spojování návyků", text: "Propoj nový návyk s tím, který už máš.", image: "assets/know-how-visual.png", label: "Tipy", icon: "♧" },
  { topic: "hydration", title: "Hydratace", subtitle: "Pitný režim", text: "Jednoduché připomenutí během dne.", image: "assets/hydratace.png", label: "Hydratace", icon: "♢" }
];

const sideNav = [
  ["home", "⌂", "Domů"], ["today", "✓", "Dnes"], ["calendar", "▣", "Kalendář"],
  ["habits", "☑", "Návyky"], ["food", "♜", "Jídlo"], ["knowhow", "♧", "Know HOW"],
  ["devices", "⬡", "Zařízení"], ["settings", "⚙", "Nastavení"]
];

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}

export function renderHome(container, rerender) {
  const now = new Date();
  const todayLabel = now.toLocaleDateString("cs-CZ", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const dayKey = Math.floor(new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() / 86400000);
  const dailyMantra = mantras[((dayKey % mantras.length) + mantras.length) % mantras.length];
  container.innerHTML = `
    <section class="home-dashboard home-dashboard-v56">
      <aside class="home-profile-rail-v56">
        <a class="home-logo-v56" href="#home" data-screen="home" aria-label="Habit APP – Domů"><img src="assets/habit-app-logo.png" alt="Habit App srdce"></a>
        <nav class="home-side-nav-v56" aria-label="Hlavní navigace">
          ${sideNav.map(([screen, icon, label]) => `<button type="button" class="home-side-link-v56 ${screen === "home" ? "active" : ""}" data-screen="${screen}"><span aria-hidden="true">${icon}</span>${label}</button>`).join("")}
        </nav>
        <button type="button" class="home-garmin-mini-v56" data-screen="devices" aria-label="Otevřít Garmin Connect">
          <span class="home-garmin-watch-v56" aria-hidden="true">⌚</span><span><strong>Garmin Connect</strong><small>Import aktivit a spánku</small><b>Otevřít →</b></span>
        </button>
        <div class="home-mountain-panel-v56"><img src="assets/home-mountains-only.jpg" alt="Ilustrace horské krajiny"><p>24 hodin.<br>1 440 minut.<br>86 400 sekund.<br><strong>Využij je.</strong></p></div>
      </aside>
      <main class="home-main-v56">
        <header class="home-topbar-v56">
          <div class="home-search-wrap-v56"><label class="home-search-v56"><span aria-hidden="true">⌕</span><input id="home-fulltext-search-v56" type="search" placeholder="Hledat články, témata, tipy…" autocomplete="off" aria-label="Fulltextové vyhledávání"></label><div id="home-search-results-v56" class="home-search-results-v56" hidden></div></div>
          <div class="home-date-v56"><span aria-hidden="true">▦</span><time>${escapeHtml(todayLabel)}</time></div>
        </header>
        <section class="home-hero-v56" aria-label="Malé kroky, velké změny">
          <img src="assets/home-hero-heart-banner.jpg" alt="Slunce prosvítá korunou stromů ve tvaru srdce; Malé kroky, velké změny" fetchpriority="high">
        </section>
        <section class="home-tile-grid-v56" aria-label="Tematické okruhy">
          ${tiles.map(tile => `<button class="home-tile-v56" type="button" data-screen="knowhow" data-topic="${tile.topic}"><span class="home-tile-image-v56 ${tile.topic === "circuit" ? "home-tile-image-strength-v59" : ""}"><img src="${tile.image}" alt="" loading="lazy"><span class="home-tile-label-v56"><b aria-hidden="true">${tile.icon}</b><small>${tile.label}</small></span></span><span class="home-tile-copy-v56"><strong>${tile.subtitle}</strong><small>${tile.text}</small><i aria-hidden="true">→</i></span></button>`).join("")}
        </section>
        <section class="home-feature-cards-v56" aria-label="Doporučené články">
          <button type="button" class="home-feature-card-v56 home-consistency-card-v56" data-screen="knowhow" data-topic="consistency"><img src="assets/consistency-knowhow-cz.png" alt="Konzistentnost – malé kroky, které vedou k velkým změnám" loading="lazy"><span class="home-feature-arrow-v56" aria-hidden="true">→</span></button>
          <button type="button" class="home-feature-card-v56 home-two-minutes-card-v56" data-screen="knowhow" data-topic="two-minutes"><img src="assets/two-minutes-home-hq.png" alt="Dvě minuty – začni nejmenší možnou verzí" loading="lazy"><span class="home-feature-arrow-v56" aria-hidden="true">→</span></button>
        </section>
        <section class="home-mantra-v56" aria-label="Mantra dne">
          <span aria-hidden="true">♡</span>
          <p>${escapeHtml(dailyMantra)}</p>
        </section>
      </main>
    </section>`;

  container.querySelectorAll("[data-screen]").forEach(el => {
    el.addEventListener("click", () => {
      setScreen(el.dataset.screen, el.dataset.topic || undefined);
      rerender();
    });
  });

  const input = container.querySelector("#home-fulltext-search-v56");
  const results = container.querySelector("#home-search-results-v56");
  input.addEventListener("input", () => {
    const query = input.value.trim();
    if (!query) { results.hidden = true; results.innerHTML = ""; return; }
    const matches = searchKnowHowTopics(query);
    results.innerHTML = matches.length
      ? matches.map(item => `<button type="button" class="home-search-result-v56" data-topic="${item.id}"><strong>${escapeHtml(item.title)}</strong><span>Otevřít článek →</span></button>`).join("")
      : `<p class="home-search-empty-v56">Nic jsem nenašel. Zkus jiné slovo nebo jednodušší popis.</p>`;
    results.hidden = false;
    results.querySelectorAll("[data-topic]").forEach(button => button.addEventListener("click", () => {
      setScreen("knowhow", button.dataset.topic);
      rerender();
    }));
  });
  input.addEventListener("keydown", event => {
    if (event.key === "Escape") { input.value = ""; results.hidden = true; results.innerHTML = ""; }
    if (event.key === "Enter") results.querySelector("[data-topic]")?.click();
  });
}
