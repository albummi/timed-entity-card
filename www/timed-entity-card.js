class TimedEntityCard extends HTMLElement {
  setConfig(config) {
    if (!config.entity) {
      throw new Error("Die `entity`-Eigenschaft muss definiert sein.");
    }
    this.config = config;
  }

  connectedCallback() {
    this.innerHTML = `
      <ha-card>
        <h1>${this.config.title || "Zeitgesteuerte Entität"}</h1>
        <div>
          <button id="start">Start</button>
        </div>
      </ha-card>
    `;
    this._addEventListeners();
  }

  _addEventListeners() {
    const startButton = this.querySelector("#start");
    startButton.addEventListener("click", () => {
      const additionalEntities = this.config.additional_entities || [];
      this._callService(additionalEntities);
    });
  }

  _callService(additionalEntities) {
    // Führe den gewünschten Service aus
    this.hass.callService("timed_entity", "start_timer", {
      entity_id: this.config.entity,
      additional_entities: additionalEntities,
    });
  }

  set hass(hass) {
    this._hass = hass;
  }

  static getConfigElement() {
    return document.createElement("timed-entity-card-editor");
  }

  static getStubConfig() {
    return {
      entity: "light.example_light",
    };
  }
}

customElements.define("timed-entity-card", TimedEntityCard);
