from homeassistant import config_entries
from homeassistant.const import CONF_NAME
from .const import DOMAIN

async def async_setup(hass, config):
    return True

async def async_setup_entry(hass, entry):
    """Set up the timed entity card integration."""
    return True
