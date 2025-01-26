import logging
from homeassistant.core import HomeAssistant
from homeassistant.helpers import discovery
from homeassistant.components import frontend

DOMAIN = "timed_entity_card"
_LOGGER = logging.getLogger(__name__)

async def async_setup(hass: HomeAssistant, config: dict):
    """Set up the timed entity card."""
    # Wenn du eine benutzerdefinierte Karte definierst, könnte hier der Bereich sein, in dem
    # die `timed-entity-card.js` Datei ins Frontend eingebunden wird.
    frontend.register_built_in_panel(
        hass, "timed-entity-card", "Timed Entity Card", "mdi:clock"
    )

    # Beispiel für das Hinzufügen von Frontend-Ressourcen, falls erforderlich
    hass.components.frontend.add_js_url("/local/timed-entity-card.js")

    # (Optional) Initialisierung von Services
    async def start_timer(call):
        """Beispielservice, der den Timer startet."""
        _LOGGER.info("Timer für %s gestartet", call.data.get("entity_id"))

    # Ein registrierter Service, der im Home Assistant verwendet werden kann.
    hass.services.async_register(DOMAIN, "start_timer", start_timer)

    return True
