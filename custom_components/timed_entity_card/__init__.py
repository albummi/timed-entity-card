"""Timed Entity Card for Home Assistant."""
from homeassistant.helpers import discovery

DOMAIN = "timed_entity_card"

def setup(hass, config):
    """Set up the Timed Entity Card component."""
    discovery.load_platform(hass, "switch", DOMAIN, {}, config)
    return True
