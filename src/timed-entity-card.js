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
            ${
                showCountdown
                    ? `
                  <div>
                    <label for="countdown">Countdown (hh:mm:ss):</label>
                    <input type="text" id="countdown" placeholder="00:10:00">
                  </div>
                `
                    : ""
            }
            ${
                showDigitalClock
                    ? `
                  <div>
                    <label for="digital_time">Digitaluhr (hh:mm):</label>
                    <input type="time" id="digital_time">
                  </div>
                `
                    : ""
            }
            ${
                showAnalogClock
                    ? `
                  <div>
                    <label for="analog_time">Analoguhr (hh:mm):</label>
                    <input type="time" id="analog_time">
                  </div>
                  <div style="text-align: center; margin-top: 10px;">
                    <svg width="100" height="100" id="analog-clock">
                      <circle cx="50" cy="50" r="48" stroke="black" stroke-width="2" fill="white"/>
                      <line id="hour-hand" x1="50" y1="50" x2="50" y2="20" stroke="black" stroke-width="4" />
                      <line id="minute-hand" x1="50" y1="50" x2="50" y2="10" stroke="black" stroke-width="2" />
                    </svg>
                  </div>
                `
                    : ""
            }
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

        // Falls Analog-Uhr aktiv ist, bewege die Zeiger
        if (this.config.show_options?.includes("analog_clock")) {
            const analogTimeInput = this.querySelector("#analog_time");
            analogTimeInput.addEventListener("input", (e) => {
                const time = e.target.value.split(":");
                const hours = parseInt(time[0], 10);
                const minutes = parseInt(time[1], 10);
                this._updateAnalogClock(hours, minutes);
            });
        }
    }

    _updateAnalogClock(hours, minutes) {
        const hourAngle = (hours % 12) * 30 + (minutes / 60) * 30;
        const minuteAngle = minutes * 6;

        const hourHand = this.querySelector("#hour-hand");
        const minuteHand = this.querySelector("#minute-hand");

        hourHand.setAttribute("transform", `rotate(${hourAngle}, 50, 50)`);
        minuteHand.setAttribute("transform", `rotate(${minuteAngle}, 50, 50)`);
    }

    _callService(countdownValue, digitalTimeValue, analogTimeValue, additionalEntities, action) {
        const duration = countdownValue
            ? this._parseTimeToSeconds(countdownValue)
            : null;

        const targetTime = digitalTimeValue || analogTimeValue || null;

        this._hass.callService("timed_entity", "start_timer", {
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
        };
    }
}

customElements.define("timed-entity-card", TimedEntityCard);
