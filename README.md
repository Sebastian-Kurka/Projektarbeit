# CI/CD-Pipeline Dokumentation

Diese Dokumentation beschreibt die Continuous Integration und Continuous Deployment (CI/CD)-Pipeline für das Projekt "Projektarbeit".

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

