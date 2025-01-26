"""Countdown-Logik für die Timed Entity Card."""
import asyncio
from datetime import timedelta
from homeassistant.core import HomeAssistant
from homeassistant.helpers.event import async_call_later


async def start_timer(hass: HomeAssistant, entity_id: str, duration: int, extra_entities: list = None):
    """Startet den Countdown und schaltet die Entität(en) aus."""
    async def turn_off(_):
        await hass.services.async_call("homeassistant", "turn_off", {"entity_id": entity_id})
        if extra_entities:
            for extra_entity in extra_entities:
                await hass.services.async_call("homeassistant", "turn_off", {"entity_id": extra_entity})

    # Countdown starten
    async_call_later(hass, duration, turn_off)
