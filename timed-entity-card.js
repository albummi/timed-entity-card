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
                    ${this._renderMainEntity()}
                    ${this._renderTimerOptions()}
                    ${this._renderAdditionalEntities()}
                    <button id="start">Start</button>
                </div>
            </ha-card>
        `;

        this._addEventListeners();
    }

    _renderMainEntity() {
        return `
            <div>
                <h3>Haupt Entität</h3>
                <p>${this.config.entity}</p>
            </div>
        `;
    }

    _renderTimerOptions() {
        const showCountdown = this.config.show_options?.includes("countdown");
        const showDigitalClock = this.config.show_options?.includes("digital_clock");
        const showAnalogClock = this.config.show_options?.includes("analog_clock");

        return `
            ${showCountdown ? `
                <div>
                    <label for="countdown">Countdown (hh:mm:ss):</label>
                    <input type="text" id="countdown" placeholder="00:10:00">
                </div>
            ` : ''}
            ${showDigitalClock ? `
                <div>
                    <label for="digital_time">Digitaluhr (hh:mm):</label>
                    <input type="time" id="digital_time">
                </div>
            ` : ''}
            ${showAnalogClock ? `
                <div>
                    <label for="analog_time">Analoguhr (hh:mm):</label>
                    <input type="time" id="analog_time">
                </div>
            ` : ''}
        `;
    }

    _renderAdditionalEntities() {
        const additionalEntities = this.config.additional_entities || [];
        return `
            <div>
                <h3>Weitere Entitäten:</h3>
                ${additionalEntities.map(entity => `
                    <p>${entity.entity_id} (${entity.action})</p>
                `).join('')}
            </div>
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
        const duration = countdownValue
            ? this._parseTimeToSeconds(countdownValue)
            : null;

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
            show_options: ["countdown", "digital_clock", "analog_clock"],
            action: "toggle",
            additional_entities: [
                { entity_id: "light.other_light", action: "toggle" },
            ],
        };
    }
}

customElements.define("timed-entity-card", TimedEntityCard);
