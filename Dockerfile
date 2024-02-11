# Verwende das Node.js-Basisimage
FROM node:18

# Setze das Arbeitsverzeichnis im Container
WORKDIR /usr/src/app

# Kopiere die Abhängigkeitsdefinitionen in den Container
COPY package*.json ./

# Installiere Abhängigkeiten
RUN npm install

# Kopiere den Rest des Codes in den Container
COPY . .

# Öffne den Port, den die Anwendung hört
EXPOSE 3000

# Starte die Anwendung
CMD ["npm", "start"]
