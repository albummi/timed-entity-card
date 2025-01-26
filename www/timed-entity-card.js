class TimedEntityCard extends HTMLElement {
  setConfig(config) {
    if (!config.entity) {
      throw new Error("You need to define an entity");
    }

    this.config = config;

    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .button {
          padding: 10px;
          background-color: #00cc00;
          color: white;
          cursor: pointer;
        }
      </style>
      <div class="container">
        <button class="button" id="start_timer">${this.config.start_button || "Start Timer"}</button>
        <div id="timer"></div>
      </div>
    `;
    
    this.shadowRoot.querySelector("#start_timer").addEventListener("click", () => this.startTimer());
  }

  startTimer() {
    const entityId = this.config.entity;
    const countdownTime = this.config.countdown_time || 60;  // default to 1 minute

    this._callService("timed_entity_card", "turn_on_timer", {
      entity_id: entityId,
      countdown_time: countdownTime
    });

    this._updateTimer(countdownTime);
  }

  _callService(domain, service, data) {
    this.hass.callService(domain, service, data);
  }

  _updateTimer(countdownTime) {
    let timer = countdownTime;
    const timerDiv = this.shadowRoot.querySelector("#timer");

    const interval = setInterval(() => {
      timer -= 1;
      timerDiv.innerText = `Time left: ${timer}s`;

      if (timer <= 0) {
        clearInterval(interval);
        timerDiv.innerText = "Time's up!";
      }
    }, 1000);
  }

  set hass(hass) {
    this._hass = hass;
  }
}

customElements.define("timed-entity-card", TimedEntityCard);
