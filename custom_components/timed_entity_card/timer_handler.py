import logging
import time
from datetime import timedelta
from homeassistant.helpers.entity import Entity
from homeassistant.helpers.event import async_call_later

_LOGGER = logging.getLogger(__name__)

class TimerHandler:
    def __init__(self, hass, entity_id, countdown_time):
        self.hass = hass
        self.entity_id = entity_id
        self.countdown_time = countdown_time
        self.timer = None

    async def start_timer(self):
        """Start the countdown timer for an entity."""
        _LOGGER.info("Starting timer for %s with %s seconds.", self.entity_id, self.countdown_time)

        # Set up the delay (in seconds)
        delay = timedelta(seconds=self.countdown_time)

        # Schedule the turn-off event
        self.timer = async_call_later(self.hass, delay.total_seconds(), self.turn_off_entity)

    async def turn_off_entity(self, _):
        """Turn off the entity after countdown ends."""
        _LOGGER.info("Turning off entity: %s", self.entity_id)
        await self.hass.services.async_call("homeassistant", "turn_off", {"entity_id": self.entity_id})
        self.timer = None
