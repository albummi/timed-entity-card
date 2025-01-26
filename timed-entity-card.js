import {
  LitElement,
  html,
  css
} from "https://unpkg.com/lit@2.0.0-beta.3?module";
class TimedEntityCard extends LitElement {
  static properties = (() => ({
    hass: {
      type: Object
    },
    config: {
      type: Object
    }
  }))();
  static getStubConfig() {
    return {
      mainEntity: "",
      countdownTime: 300,
      entitiesToTurnOff: []
    };
  }
  render() {
    return html`
      <ha-card>
        <div class="card-content">
          <h1>Timed Entity Card</h1>
          <p>Main Entity: ${this.config?.mainEntity || "None"}</p>
          <p>Countdown Time: ${
            this.config?.countdownTime || "Not Set"
          } seconds</p>
          <p>Entities to Turn Off: ${
            this.config?.entitiesToTurnOff.join(", ") || "None"
          }</p>
        </div>
      </ha-card>
    `;
  }
  static get styles() {
    return css`
      ha-card {
        padding: 16px;
      }
    `;
  }
  setConfig(config) {
    if (!config.mainEntity) {
      throw new Error("You need to define a main entity.");
    }
    this.config = config;
  }
}
class TimedEntityCardConfig extends LitElement {
  static properties = (() => ({
    hass: {
      type: Object
    },
    config: {
      type: Object
    }
  }))();
  render() {
    return html`
      <div class="card-config">
        <label>Main Entity:</label>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this.config?.mainEntity || ""}
          @change=${this._mainEntityChanged}
        ></ha-entity-picker>
        
        <label>Countdown Time (seconds):</label>
        <ha-textfield
          .value=${this.config?.countdownTime || ""}
          @input=${this._countdownTimeChanged}
        ></ha-textfield>

        <label>Entities to Turn Off:</label>
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this.config?.entitiesToTurnOff || []}
          @change=${this._entitiesToTurnOffChanged}
          multiple
        ></ha-entity-picker>
      </div>
    `;
  }
  _mainEntityChanged(event) {
    this.config = {
      ...this.config,
      mainEntity: event.target.value
    };
  }
  _countdownTimeChanged(event) {
    this.config = {
      ...this.config,
      countdownTime: event.target.value
    };
  }
  _entitiesToTurnOffChanged(event) {
    this.config = {
      ...this.config,
      entitiesToTurnOff: event.target.value
    };
  }
  static get styles() {
    return css`
      .card-config {
        display: grid;
        gap: 10px;
      }
      label {
        font-weight: bold;
      }
    `;
  }
}
customElements.define("timed-entity-card", TimedEntityCard);
customElements.define("timed-entity-card-config", TimedEntityCardConfig);
