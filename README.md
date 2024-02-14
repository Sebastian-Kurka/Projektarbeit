# CI/CD-Pipeline Dokumentation

Diese Dokumentation beschreibt die Continuous Integration und Continuous Deployment (CI/CD)-Pipeline für meine Projektarbeit.

## Überblick

Die CI/CD-Pipeline automatisiert den Build-, Test- und Bereitstellungsprozess des Projekts. Sie ermöglicht eine effiziente Entwicklung, Überprüfung und Bereitstellung von Änderungen in der Anwendung.

## Pipeline-Schritte

Die Pipeline besteht aus den folgenden Schritten:

1. **Checkout-Repository**: Dieser Schritt lädt den Quellcode aus dem GitHub-Repository herunter, damit er in der Pipeline verwendet werden kann.

2. **Setup Node.js**: Hier wird die Node.js-Umgebung für den Build-Prozess eingerichtet. Es wird die Node.js-Version 18 verwendet.

3. **Install dependencies**: In diesem Schritt werden alle Projektabhängigkeiten mithilfe von npm installiert.

4. **Run tests**: Die Tests des Projekts werden ausgeführt, um sicherzustellen, dass die Änderungen keine vorhandene Funktionalität beeinträchtigen.

5. **Set up Docker Buildx**: Docker Buildx wird eingerichtet, um das Cross-Building von Docker-Images zu ermöglichen.

6. **Log in to Docker Hub**: Anmeldung beim Docker Hub mit den bereitgestellten Anmeldeinformationen (Benutzername und Passwort).

7. **Build and push Docker image**: Das Docker-Image wird erstellt und anschließend in das Docker Hub-Repository hochgeladen. Das Image wird mit dem Tag "latest" versehen.

## Konfiguration

Die Pipeline wird ausgelöst, wenn Änderungen im Branch "main" vorgenommen und gepusht werden.

## Verwendung von Secrets

Für die sichere Verwendung von Anmeldeinformationen in der Pipeline werden GitHub Secrets verwendet. Die Secrets `DOCKER_USERNAME` und `DOCKER_PASSWORD` sind erforderlich, um sich beim Docker Hub anzumelden und das Image hochzuladen.

---
---
# Tests im Überblick

### Dokumentation der Tic Tac Toe Tests

Die folgende Dokumentation beschreibt die Arbeitsweise der einzelnen Tests im Tic Tac Toe Testskript (`game.test.js`). Diese Tests überprüfen verschiedene Aspekte des Tic Tac Toe-Spiels, um sicherzustellen, dass es korrekt funktioniert.

---

#### Test: Überprüfung einer Gewinnsituation

- **Beschreibung**: Dieser Test prüft, ob das Spiel korrekt eine Gewinnsituation identifiziert, wenn ein Spieler eine Siegbedingung erfüllt hat.
  
- **Arbeitsweise**: 
  - Es wird ein Zustand simuliert, in dem ein Spieler (PLAYER) drei aufeinanderfolgende Zellen in einer Zeile besetzt hat.
  - Die `checkWinner`-Funktion wird aufgerufen, um zu überprüfen, ob ein Gewinner ermittelt wird.
  - Das Ergebnis wird mit `true` verglichen, um sicherzustellen, dass das Spiel die Gewinnsituation erkannt hat.

---

#### Test: Überprüfung einer Unentschieden-Situation

- **Beschreibung**: Dieser Test prüft, ob das Spiel korrekt eine Unentschieden-Situation erkennt, wenn alle Zellen belegt sind, aber kein Spieler gewonnen hat.
  
- **Arbeitsweise**: 
  - Es wird ein Zustand simuliert, in dem alle Zellen des Spielfelds belegt sind, jedoch kein Spieler eine Gewinnsituation erreicht hat.
  - Die `checkDraw`-Funktion wird aufgerufen, um zu überprüfen, ob das Spiel unentschieden endet.
  - Das Ergebnis wird mit `true` verglichen, um sicherzustellen, dass das Spiel die Unentschieden-Situation erkannt hat.

---

#### Test: Überprüfung des Spielendes bei einem Spieler-Gewinn

- **Beschreibung**: Dieser Test prüft, ob das Spiel korrekt endet, wenn ein Spieler eine Gewinnsituation erreicht hat.
  
- **Arbeitsweise**: 
  - Es wird ein Zustand simuliert, in dem ein Spieler drei aufeinanderfolgende Zellen in einer Zeile besetzt hat.
  - Die `testCheckGameOver`-Funktion wird aufgerufen, um das Spielende zu überprüfen, nachdem ein Spieler gewonnen hat.
  - Es wird überprüft, ob die Spielaktivität (`gameActive`) nach dem Aufruf der Funktion auf `false` gesetzt ist.

---

#### Test: Überprüfung des Spielendes bei einem Unentschieden

- **Beschreibung**: Dieser Test prüft, ob das Spiel korrekt endet, wenn alle Zellen belegt sind, aber kein Spieler gewonnen hat.
  
- **Arbeitsweise**: 
  - Es wird ein Zustand simuliert, in dem alle Zellen des Spielfelds belegt sind, aber kein Spieler eine Gewinnsituation erreicht hat.
  - Die `testCheckGameOver`-Funktion wird aufgerufen, um das Spielende zu überprüfen, nachdem alle Zellen belegt sind.
  - Es wird überprüft, ob die Spielaktivität (`gameActive`) nach dem Aufruf der Funktion auf `false` gesetzt ist.

---

