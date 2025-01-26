import { LitElement, html, css, customElement, property } from 'lit';
import { HomeAssistant } from 'custom-card-helpers';

@customElement('timed-entity-card')
class TimedEntityCard extends LitElement {
  @property() public hass?: HomeAssistant;
  @property() public config?: any;

  static styles = css`
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
  `;

  render() {
    return html`
      <div class="card">
        <div class="header">Timed Entity Card</div>
        <div class="time-display">
          Countdown Time: ${this.config?.countdown_time || 'Not Set'}
        </div>
        <!-- Weitere Kartenelemente hier -->
      </div>
    `;
  }
}
