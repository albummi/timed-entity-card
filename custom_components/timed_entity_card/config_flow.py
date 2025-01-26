from homeassistant import config_entries
from homeassistant.core import callback
from .const import DOMAIN

class TimedEntityCardConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Timed Entity Card."""

    VERSION = 1

    async def async_step_user(self, user_input=None):
        """Handle the initial step of configuration."""
        errors = {}
        if user_input is not None:
            # Create entry with user-provided data
            return self.async_create_entry(title="Timed Entity Card", data=user_input)

        return self.async_show_form(
            step_id="user",
            data_schema=self._get_schema(),
            errors=errors,
        )

    @staticmethod
    @callback
    def _get_schema():
        """Return the schema for the config flow form."""
        from homeassistant.helpers import config_validation as cv
        import voluptuous as vol

        return vol.Schema({
            vol.Required("main_entity"): cv.entity_id,
            vol.Optional("default_time", default="00:05:00"): str,
            vol.Optional("additional_entities", default=[]): cv.multi_select([])
        })
