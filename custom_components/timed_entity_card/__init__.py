from homeassistant import config_entries
from homeassistant.core import HomeAssistant

async def async_setup(hass: HomeAssistant, config: dict):
    """Set up the timed entity card component."""
    return True

async def async_setup_entry(hass: HomeAssistant, entry: config_entries.ConfigEntry):
    """Set up a config entry."""
    return True
