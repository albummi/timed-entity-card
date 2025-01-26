class TimedEntityCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
  }

  setConfig(config) {
    this.config = config;
    this.mainEntity = config.main_entity;
    this.countdownTime = config.countdown_time || 30; // Standardwert 30 Minuten
    this.entitiesToSwitchOff = config.entities_to_switch_off || [];
    this._render();
  }

  _render() {
    this.shadowRoot.innerHTML = `
      <style>
        .button {
          padding: 10px;
          font-size: 16px;
          background-color: #4CAF50;
          color: white;
          border: none;
          cursor: pointer;
        }
      </style>
      <div>
        <button class="button" id="startButton">Start Countdown</button>
      </div>
    `;

    this.shadowRoot.querySelector("#startButton").addEventListener('click', () => {
      this._startCountdown();
    });
  }

  async _startCountdown() {
    // Schaltet die Main Entity ein
    await this._toggleEntity(this.mainEntity, true);
    
    // Öffnet das Fenster für den Countdown
    const countdown = window.prompt("Geben Sie die Zeit in Minuten ein (Standard: " + this.countdownTime + " Minuten):", this.countdownTime);
    const timeInMinutes = parseInt(countdown) || this.countdownTime;

    setTimeout(async () => {
      // Schaltet die Entitäten aus, wenn der Countdown abgelaufen ist
      for (let entity of this.entitiesToSwitchOff) {
        await this._toggleEntity(entity, false);
      }
      await this._toggleEntity(this.mainEntity, false);
    }, timeInMinutes * 60000); // Umrechnung in Millisekunden
  }

  async _toggleEntity(entity, state) {
    const service = state ? 'turn_on' : 'turn_off';
    await this.hass.callService('homeassistant', service, { entity_id: entity });
  }

  get hass() {
    return window.document.querySelector('home-assistant').hass;
  }
}

customElements.define('timed-entity-card', TimedEntityCard);
