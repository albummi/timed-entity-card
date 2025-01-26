import logging

from homeassistant.core import HomeAssistant

_LOGGER = logging.getLogger(__name__)

async def async_setup(hass: HomeAssistant, config: dict):
    """Set up the Timed Entity Card integration."""
    _LOGGER.debug("Setting up Timed Entity Card integration...")
    return True

async def async_setup_entry(hass: HomeAssistant, entry):
    """Set up the integration from a config entry."""
    _LOGGER.debug("Setting up Timed Entity Card from config entry...")
    return True
