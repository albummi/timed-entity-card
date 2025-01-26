class TimedEntityCardEditor extends HTMLElement {
  setConfig(config) {
    this.config = config;
  }

  connectedCallback() {
    this.innerHTML = `
      <div>
        <label>Haupt-Entity:</label>
        <input type="text" id="entity" value="${this.config.entity || ''}">
      </div>
      <div>
        <label>Zusätzliche Entitäten:</label>
        <input type="text" id="additional_entities" value="${this.config.additional_entities || ''}">
      </div>
      <div>
        <label>Standardzeit (hh:mm:ss):</label>
        <input type="text" id="default_time" value="${this.config.default_time || '00:10:00'}">
      </div>
    `;
    this._addEventListeners();
  }

  _addEventListeners() {
    const entityInput = this.querySelector("#entity");
    entityInput.addEventListener("input", () => {
      this.config.entity = entityInput.value;
    });

    const additionalEntitiesInput = this.querySelector("#additional_entities");
    additionalEntitiesInput.addEventListener("input", () => {
      this.config.additional_entities = additionalEntitiesInput.value.split(",").map(item => item.trim());
    });

    const defaultTimeInput = this.querySelector("#default_time");
    defaultTimeInput.addEventListener("input", () => {
      this.config.default_time = defaultTimeInput.value;
    });
  }
}

customElements.define("timed-entity-card-editor", TimedEntityCardEditor);
