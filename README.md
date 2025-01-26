# Timed Entity Card
Eine Home Assistant Integration, die es ermöglicht, eine Entität mit einem Countdown-Timer zu steuern.

## Funktionen
- Entität ein-/ausschalten mit Countdown.
- Einfaches Overlay zur Eingabe der Zeit.
- Anzeige der verbleibenden Zeit.

## Installation
1. Installiere die Integration über HACS.
2. Füge die Karte zu deinem Dashboard hinzu:
   ```yaml
   type: custom:timed-entity-card
   entity: switch.example
