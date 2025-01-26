
# Timed Entity Card

Eine Home Assistant-Lovelace-Karte, die es ermöglicht, eine Haupt-Entität mit einem einstellbaren Countdown zu schalten und gleichzeitig zusätzliche Entitäten zu steuern.

## Funktionen
- Countdown beim Schalten einer Entität (z. B. Licht, Schalter, Ventilator).
- Unterstützung mehrerer zusätzlicher Entitäten, die ebenfalls geschaltet werden können.
- Anpassung, ob Countdown beim `Tap`, `DoubleTap` oder `Hold` angezeigt wird.
- Unterstützung für UI-basierte Konfiguration.

## Installation

### Über HACS
1. Öffne HACS in Home Assistant.
2. Gehe zu **Frontend** und füge ein benutzerdefiniertes Repository hinzu.
3. Gib die URL des Repositories ein: `https://github.com/<your-github-username>/timed-entity-card`.
4. Wähle die Kategorie `Lovelace`.
5. Suche nach **Timed Entity Card** und installiere sie.

### Manuelle Installation
1. Lade die Datei `timed-entity-card.js` aus dem `dist`-Ordner herunter.
2. Kopiere die Datei in deinen `www`-Ordner im Home Assistant-Verzeichnis.
3. Füge den folgenden Code in deine `configuration.yaml` ein:
   ```yaml
   lovelace:
     resources:
       - url: /local/timed-entity-card.js
         type: module
