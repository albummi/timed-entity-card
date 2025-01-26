"""Initialisiert die Timed Entity Card Integration."""
from homeassistant.core import HomeAssistant

DOMAIN = "timed_entity_card"


async def async_setup(hass: HomeAssistant, config: dict):
    """Setup der Integration."""
    return True
