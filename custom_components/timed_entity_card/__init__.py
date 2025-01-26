"""Timed Entity Card - Home Assistant custom component."""

from homeassistant.helpers import config_validation as cv
from homeassistant.components.frontend import (
    async_register_frontend_component,
    FrontendError,
)

DOMAIN = "timed_entity_card"

async def async_setup(hass, config):
    """Set up the Timed Entity Card."""
    # Registrierung der Frontend-Komponente (die Karte)
    try:
        # Diese Zeile sorgt dafür, dass deine Karte im Frontend registriert wird
        await async_register_frontend_component(
            hass, DOMAIN, "timed-entity-card.js"
        )
    except FrontendError as err:
        hass.logger.error(f"Fehler beim Registrieren der Karte: {err}")
        return False

    return True
