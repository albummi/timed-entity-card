import { html, css, LitElement } from 'lit';

class TimedEntityCardEditor extends LitElement {

  static styles = css`
    .editor {
      padding: 16px;
    }
    .field {
      margin-bottom: 16px;
    }
    label {
      display: block;
      font-weight: bold;
    }
    input, select {
      width: 100%;
      padding: 8px;
      margin-top: 4px;
    }
  `;

  static get properties() {
    return {
      hass: { type: Object },
      config: { type: Object }
    };
  }

  constructor() {
    super();
    this.config = {
      entity: '',
      default_time: '00:10:00',
      show_options: ['countdown'],
      additional_entities: [],
      action: 'toggle',
    };
  }

  render() {
    return html`
      <div class="editor">
        <div class="field">
          <label for="entity">Main Entity:</label>
          <input id="entity" type="text" .value="${this.config.entity}" @input="${this._updateEntity}">
        </div>

        <div class="field">
          <label for="default_time">Default Timer (hh:mm:ss):</label>
          <input id="default_time" type="text" .value="${this.config.default_time}" @input="${this._updateDefaultTime}">
        </div>

        <div class="field">
          <label for="show_options">Show Options:</label>
          <select id="show_options" @change="${this._updateShowOptions}">
            <option value="countdown" ?selected="${this.config.show_options.includes('countdown')}">Countdown</option>
            <option value="digital_clock" ?selected="${this.config.show_options.includes('digital_clock')}">Digital Clock</option>
            <option value="analog_clock" ?selected="${this.config.show_options.includes('analog_clock')}">Analog Clock</option>
          </select>
        </div>

        <div class="field">
          <label for="additional_entities">Additional Entities (comma separated):</label>
          <input id="additional_entities" type="text" .value="${this.config.additional_entities.join(', ')}" @input="${this._updateAdditionalEntities}">
        </div>

        <div class="field">
          <label for="action">Action:</label>
          <select id="action" @change="${this._updateAction}">
            <option value="toggle" ?selected="${this.config.action === 'toggle'}">Toggle</option>
            <option value="turn_on" ?selected="${this.config.action === 'turn_on'}">Turn On</option>
            <option value="turn_off" ?selected="${this.config.action === 'turn_off'}">Turn Off</option>
          </select>
        </div>
      </div>
    `;
  }

  _updateEntity(event) {
    this.config.entity = event.target.value;
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this.config } }));
  }

  _updateDefaultTime(event) {
    this.config.default_time = event.target.value;
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this.config } }));
  }

  _updateShowOptions(event) {
    this.config.show_options = [event.target.value];
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this.config } }));
  }

  _updateAdditionalEntities(event) {
    this.config.additional_entities = event.target.value.split(',').map(e => e.trim());
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this.config } }));
  }

  _updateAction(event) {
    this.config.action = event.target.value;
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this.config } }));
  }
}

customElements.define('timed-entity-card-editor', TimedEntityCardEditor);
