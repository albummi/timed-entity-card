from homeassistant import config_entries
from homeassistant.core import callback
from homeassistant.helpers import config_validation as cv
import voluptuous as vol

from .const import DOMAIN  # Sicherstellen, dass DOMAIN korrekt importiert wird


class TimedEntityCardConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Timed Entity Card."""

    VERSION = 1

    async def async_step_user(self, user_input=None):
        """Handle the initial step."""
        errors = {}

        if user_input is not None:
            # Validiere die Benutzereingabe
            if not user_input.get("main_entity"):
                errors["base"] = "entity_required"
            else:
                # Erstelle den Eintrag, wenn alle Eingaben korrekt sind
                return self.async_create_entry(title="Timed Entity Card", data=user_input)

        # Zeige das Formular erneut, wenn es Fehler gibt
        return self.async_show_form(
            step_id="user",
            data_schema=self._get_schema(),
            errors=errors,
        )

    @staticmethod
    @callback
    def _get_schema():
        """Return the schema for the form."""
        return vol.Schema({
            vol.Required("main_entity"): cv.entity_id,
            vol.Optional("default_time", default="00:05:00"): str,
            vol.Optional("additional_entities", default=[]): cv.multi_select({})
        })
