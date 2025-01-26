class TimedEntityCard extends HTMLElement {
    set hass(hass) {
        if (!this.content) {
            this.content = document.createElement('div');
            this.appendChild(this.content);
        }

        const entityId = this.config.entity;
        const state = hass.states[entityId];

        this.content.innerHTML = `
            <div>
                <button id="activate-btn">${state.attributes.friendly_name || entityId}</button>
                <div id="countdown-display" style="margin-top: 10px;"></div>
            </div>
        `;

        this.content.querySelector('#activate-btn').onclick = () => {
            const duration = prompt("Set countdown time (in seconds):", "3600");
            if (duration) {
                hass.callService('timed_entity_card', 'start_timer', {
                    entity_id: entityId,
                    duration: parseInt(duration)
                });
            }
        };
    }

    setConfig(config) {
        if (!config.entity) {
            throw new Error("You need to define an entity");
        }
        this.config = config;
    }

    getCardSize() {
        return 1;
    }
}

customElements.define('timed-entity-card', TimedEntityCard);
