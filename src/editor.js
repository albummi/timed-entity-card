class TimedEntityCardEditor extends HTMLElement {
  setConfig(config) {
    this.config = config;
    this.innerHTML = `
      <div class="card-config">
        <label>
          Hauptentität:
          <input type="text" id="main_entity" value="${config.main_entity || ""}" />
        </label>
        <label>
          Standard-Countdown-Zeit (in Minuten):
          <input type="number" id="countdown_time" value="${config.countdown_time || 30}" />
        </label>
        <label>
          Entitäten zum Ausschalten (Komma getrennt):
          <input type="text" id="entities_to_switch_off" value="${(config.entities_to_switch_off || []).join(",")}" />
        </label>
      </div>
    `;
  }

  get value() {
    return {
      main_entity: this.querySelector("#main_entity").value,
      countdown_time: parseInt(this.querySelector("#countdown_time").value),
      entities_to_switch_off: this.querySelector("#entities_to_switch_off").value.split(","),
    };
  }
}

customElements.define("timed-entity-card-editor", TimedEntityCardEditor);
