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
            return self.async_create_entry(title="Timed Entity Card", data=user_input)

        data_schema = vol.Schema({
            vol.Required("main_entity"): cv.entity_id,
            vol.Optional("default_time", default="00:05:00"): str,
        })

        return self.async_show_form(
            step_id="user",
            data_schema=data_schema,
            errors=errors,
        )
