import { setScreen } from "../state.js";

export function renderFood(container, rerender) {
  container.innerHTML = `
    <section class="food-page">
      <div class="food-hero">
        <div>
          <div class="food-kicker">🥗 Jídlo</div>
          <h1>Jídlo pro každý den</h1>
          <p>Praktické inspirace pro pestré, vyvážené a dlouhodobě udržitelné stravování. Bez zákazů, strašení a honby za dokonalostí.</p>
        </div>
        <div class="food-hero-badge">Jídlo má být<br><strong>součást života.</strong></div>
      </div>

      <div class="food-grid">
        <button class="food-card food-card-featured" type="button" data-topic="plate">
          <span class="food-card-icon">🍽️</span>
          <strong>Jak si sestavovat talíř</strong>
          <span>Jednoduchá pomůcka pro pestré a vyvážené porce bez nutnosti počítat každý gram.</span>
          <b>Otevřít →</b>
        </button>
        <button class="food-card" type="button" data-topic="breakfast">
          <span class="food-card-icon">🍳</span>
          <strong>Snídaně</strong>
          <span>Inspirace pro soustředění, svaly, trávení i klidnější start dne.</span>
          <b>Otevřít →</b>
        </button>
        <button class="food-card" type="button" data-topic="nighttime-cortisol">
          <span class="food-card-icon">🌙</span>
          <strong>Jídlo a večerní režim</strong>
          <span>Co může být součástí klidnějšího večera a proč záleží na celém režimu.</span>
          <b>Otevřít →</b>
        </button>
      </div>

      <div class="food-note">
        <strong>Nejde o dokonalý jídelníček.</strong>
        <span>Smyslem je najít jednoduché principy a jídla, která můžeš přirozeně opakovat dlouhodobě.</span>
      </div>
    </section>
  `;

  container.querySelectorAll(".food-card").forEach(card => {
    card.onclick = () => {
      setScreen("knowhow", card.dataset.topic);
      rerender();
    };
  });
}
