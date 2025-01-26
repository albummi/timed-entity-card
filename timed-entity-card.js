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
          ${this._renderTimerOptions()}
          <button id="start">Start</button>
        </div>
      </ha-card>
    `;
    this._addEventListeners();
  }

  _renderTimerOptions() {
    const showCountdown = this.config.show_options?.includes("countdown");
    const showDigitalClock = this.config.show_options?.includes("digital_clock");
    const showAnalogClock = this.config.show_options?.includes("analog_clock");

    return `
      ${showCountdown ? `<div><label for="countdown">Countdown:</label><input type="text" id="countdown" value="${this.config.default_time}"></div>` : ""}
      ${showDigitalClock ? `<div><label for="digital_time">Digital Time:</label><input type="time" id="digital_time"></div>` : ""}
      ${showAnalogClock ? `<div><label for="analog_time">Analog Time:</label><input type="time" id="analog_time"></div>` : ""}
    `;
  }

  _addEventListeners() {
    const startButton = this.querySelector("#start");
    startButton.addEventListener("click", () => {
      const countdownValue = this.querySelector("#countdown")?.value || null;
      const digitalTimeValue = this.querySelector("#digital_time")?.value || null;
      const analogTimeValue = this.querySelector("#analog_time")?.value || null;

      const additionalEntities = this.config.additional_entities || [];
      const action = this.config.action || "toggle";

      this._callService(countdownValue, digitalTimeValue, analogTimeValue, additionalEntities, action);
    });
  }

  _callService(countdownValue, digitalTimeValue, analogTimeValue, additionalEntities, action) {
    const duration = countdownValue ? this._parseTimeToSeconds(countdownValue) : null;
    const targetTime = digitalTimeValue || analogTimeValue || null;

    this.hass.callService("timed_entity", "start_timer", {
      entity_id: this.config.entity,
      duration: duration,
      target_time: targetTime,
      additional_entities: additionalEntities,
      action: action,
    });
  }

  _parseTimeToSeconds(timeStr) {
    const [hh, mm, ss] = timeStr.split(":").map(Number);
    return hh * 3600 + mm * 60 + (ss || 0);
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
      default_time: "00:10:00",
      show_options: ["countdown"],
      additional_entities: [],
      action: "toggle",
    };
  }
}

customElements.define("timed-entity-card", TimedEntityCard);
