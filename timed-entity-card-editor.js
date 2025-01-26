class TimedEntityCardEditor extends HTMLElement {
    setConfig(config) {
        this.config = config;
    }

    connectedCallback() {
        this.innerHTML = `
            <div>
                <label for="entity">Hauptentität:</label>
                <ha-config-field>
                    <input id="entity" value="${this.config.entity || ''}" />
                </ha-config-field>
            </div>

            <div>
                <label for="default_timer">Standard-Timer:</label>
                <ha-config-field>
                    <input id="default_timer" value="${this.config.default_timer || '00:10:00'}" />
                </ha-config-field>
            </div>

            <div>
                <label for="additional_entities">Zusätzliche Entitäten:</label>
                <ha-config-field>
                    <textarea id="additional_entities">${JSON.stringify(this.config.additional_entities || [])}</textarea>
                </ha-config-field>
            </div>

            <div>
                <label for="show_options">Angezeigte Optionen:</label>
                <ha-config-field>
                    <input id="show_options" value="${this.config.show_options || ''}" />
                    <small>Trenne Optionen durch Kommata (z.B. "countdown,digital_clock,analog_clock")</small>
                </ha-config-field>
            </div>
        `;

        this._addEventListeners();
    }

    _addEventListeners() {
        this.querySelector("#entity").addEventListener("input", (e) => {
            this.config.entity = e.target.value;
        });

        this.querySelector("#default_timer").addEventListener("input", (e) => {
            this.config.default_timer = e.target.value;
        });

        this.querySelector("#additional_entities").addEventListener("input", (e) => {
            this.config.additional_entities = JSON.parse(e.target.value);
        });

        this.querySelector("#show_options").addEventListener("input", (e) => {
            this.config.show_options = e.target.value.split(",").map(option => option.trim());
        });
    }

    static get styles() {
        return `
            ha-config-field {
                margin-bottom: 10px;
                display: block;
            }

            input, textarea {
                width: 100%;
                padding: 5px;
                font-size: 1rem;
            }
        `;
    }
}

customElements.define("timed-entity-card-editor", TimedEntityCardEditor);
