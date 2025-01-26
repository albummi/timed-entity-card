import {
  LitElement,
  html,
  css
} from "https://unpkg.com/lit@2.0.0-beta.3/lit.js?module";
class TimedEntityCard extends LitElement {
  static get properties() {
    return {
      hass: {
        type: Object
      },
      config: {
        type: Object
      }
    };
  }
  static styles = (() => css`
    .card {
      padding: 16px;
      background-color: var(--primary-background-color);
      border-radius: 8px;
      box-shadow: var(--ha-card-box-shadow);
    }
    .header {
      font-size: 20px;
      font-weight: bold;
    }
    .time-display {
      font-size: 14px;
      margin-top: 10px;
    }
  `)();
  constructor() {
    super();
    this.hass = undefined;
    this.config = undefined;
  }
  render() {
    return html`
      <div class="card">
        <div class="header">Timed Entity Card</div>
        <div class="time-display">
          Countdown Time: ${this.config?.countdown_time || "Not Set"}
        </div>
      </div>
    `;
  }
}

// Registriere das Custom Element
customElements.define("timed-entity-card", TimedEntityCard);
