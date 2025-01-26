import logging
from homeassistant import config_entries
from homeassistant.core import callback
import voluptuous as vol
from homeassistant.helpers import config_validation as cv
from .const import DOMAIN

_LOGGER = logging.getLogger(__name__)

class TimedEntityCardConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Timed Entity Card."""

    VERSION = 1

    async def async_step_user(self, user_input=None):
        _LOGGER.debug("Starting config flow: async_step_user")
        errors = {}

        if user_input is not None:
            _LOGGER.debug("User input received: %s", user_input)
            try:
                # Überprüfe Eingaben
                if not user_input.get("main_entity"):
                    errors["base"] = "entity_required"
                else:
                    # Erstelle den Eintrag, wenn alles korrekt ist
                    _LOGGER.debug("Creating config entry")
                    return self.async_create_entry(title="Timed Entity Card", data=user_input)
            except Exception as e:
                _LOGGER.error("Error in config flow: %s", e)
                errors["base"] = "unknown"

        # Schema definieren
        data_schema = vol.Schema({
            vol.Required("main_entity"): cv.entity_id,
            vol.Optional("default_time", default="00:05:00"): str,
            vol.Optional("additional_entities", default=[]): cv.multi_select({
                "light.living_room": "Living Room Light",
                "switch.kitchen": "Kitchen Switch"
            })
        })

        _LOGGER.debug("Displaying form with schema: %s", data_schema)
        return self.async_show_form(
            step_id="user",
            data_schema=data_schema,
            errors=errors,
        )
