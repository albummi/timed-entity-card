from homeassistant.helpers import discovery

def setup(hass, config):
    """Set up the timed entity card component."""
    discovery.load_platform(hass, "sensor", "timed_entity_card", {}, config)
    return True
