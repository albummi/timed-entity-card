class TimedEntityCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set hass(hass) {
    this._hass = hass;
    if (!this.shadowRoot.querySelector('div')) {
      this._render();
    }
  }

  setConfig(config) {
    if (!config.main_entity) {
      throw new Error('main_entity is required.');
    }
    this.config = config;
    this._render();
  }

  static getConfigElement() {
    return document.createElement('timed-entity-card-editor');
  }

  static getStubConfig() {
    return {
      main_entity: '',
      countdown_time: 10,
      entities_to_switch_off: []
    };
  }

  _render() {
    const { main_entity } = this.config;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 16px;
        }
        button {
          background: var(--primary-color);
          color: white;
          border: none;
          padding: 10px;
          border-radius: 5px;
          cursor: pointer;
        }
      </style>
      <div>
        <button id="startButton">Start ${main_entity}</button>
      </div>
    `;

    this.shadowRoot.querySelector('#startButton').addEventListener('click', () => {
      this._startCountdown();
    });
  }

  _startCountdown() {
    const { main_entity, countdown_time, entities_to_switch_off } = this.config;

    // Schaltet die Hauptentität ein
    this._hass.callService('homeassistant', 'turn_on', { entity_id: main_entity });

    // Countdown starten
    setTimeout(() => {
      (entities_to_switch_off || [main_entity]).forEach(entity => {
        this._hass.callService('homeassistant', 'turn_off', { entity_id: entity });
      });
    }, countdown_time * 1000);
  }
}

customElements.define('timed-entity-card', TimedEntityCard);
