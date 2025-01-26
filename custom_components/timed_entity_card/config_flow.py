import logging
from homeassistant import config_entries
from homeassistant.helpers import config_validation as cv
import voluptuous as vol
from .const import DOMAIN

_LOGGER = logging.getLogger(__name__)

class TimedEntityCardConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Timed Entity Card."""

    VERSION = 1

    async def async_step_user(self, user_input=None):
        """Handle the initial step."""
        errors = {}

        if user_input is not None:
            # Versuche, die Eingabedaten zu verarbeiten
            _LOGGER.debug("User input received: %s", user_input)

            if not user_input.get("main_entity"):
                errors["base"] = "entity_required"
            else:
                _LOGGER.debug("Creating config entry with input: %s", user_input)
                return self.async_create_entry(title="Timed Entity Card", data=user_input)

        # Definiere das Formularschema
        data_schema = vol.Schema({
            vol.Required("main_entity"): cv.entity_id,
            vol.Optional("default_time", default="00:05:00"): str,
        })

        # Zeige das Formular an
        return self.async_show_form(
            step_id="user",
            data_schema=data_schema,
            errors=errors,
        )
