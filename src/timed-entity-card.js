class TimedEntityCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set hass(hass) {
    this._hass = hass;
    if (!this.shadowRoot.querySelector("button")) {
      this._render();
    }
  }

  static getConfigElement() {
    return document.createElement("timed-entity-card-editor");
  }

  static getStubConfig() {
    return {
      main_entity: "",
      countdown_time: 30,
      entities_to_switch_off: [],
    };
  }

  setConfig(config) {
    if (!config.main_entity) {
      throw new Error("Die Hauptentität (main_entity) ist erforderlich.");
    }
    this.config = config;
    this._render();
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <style>
        button { 
          background-color: var(--primary-color); 
          color: white; 
          border: none; 
          padding: 10px; 
          cursor: pointer; 
        }
      </style>
      <div>
        <button id="startButton">Countdown starten</button>
      </div>
    `;

    this.shadowRoot.querySelector("#startButton").addEventListener("click", () => {
      this._startCountdown();
    });
  }

  async _startCountdown() {
    const { main_entity, countdown_time, entities_to_switch_off } = this.config;

    // Schaltet die Hauptentität ein
    await this._toggleEntity(main_entity, true);

    // Zeigt ein Eingabefenster für die Countdown-Zeit an
    const time = window.prompt(
      "Countdown-Zeit in Minuten (Standard: " + countdown_time + "):",
      countdown_time
    );

    const duration = parseInt(time) || countdown_time;

    setTimeout(async () => {
      for (const entity of entities_to_switch_off || [main_entity]) {
        await this._toggleEntity(entity, false);
      }
    }, duration * 60000);
  }

  async _toggleEntity(entity_id, state) {
    const service = state ? "turn_on" : "turn_off";
    await this._hass.callService("homeassistant", service, { entity_id });
  }
}

customElements.define("timed-entity-card", TimedEntityCard);
