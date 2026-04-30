# Node.js + express - a crash course
Node.js er et program som lar deg kjøre JavaScript utenfor nettleseren.
Normalt kjører JavaScript i nettleseren (Chrome, Firefox osv.), men med Node kan du:
- lage servere
- lagre data
- bygge API-er
- koble frontend og backend

---
Hva er målet for dagen?
---
*Bygge en “mini-nettside-server”*

**Målet er at du skal kunne:**
- Lage en basic HTML side
- Koble en HTML-fil til en Node.js server
- Ikke bruke “Go Live” men heller terminalen

---
Installasjoner
---

Opprett en ny mappe og åpne den i vscode

Lag denne mappestrukturen:
````
root/
│
├── frontend/
│   └── index.html
│
└── server.js
````

**Installer Homebrew (hvis du ikke har det)**
Kjør dette i terminal:
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**Installer Node.js**
Kjør dette i terminal:
```
brew install node
```
***Sjekk at det funker!***
```
node -v
npm -v
```

---
Del 1 - Grunnleggende funksjon i node
---

**Mer installering T-T**

Express: Express er et rammeverk som gjør det enklere å lage servere
````
npm install --save express
````

CORS: Lar frontend og backend snakke sammen (viktig!)
```
npm install cors
```

Nodemon (globalt): Nodemon gjør at serveren restartes automatisk når du lagrer filer
````
npm install -g nodemon
````

**La oss sette opp serveren**

Vi skal gjøre følgende

- Importere Express-bibliotek
    - Gjør det mulig å lage server raskt
    - Gir oss funksjoner som app.get() og app.listen()

- Innebygd Node-modul
    - Hjelper oss å jobbe med filstier
    - Brukes for å finne filer som HTML

- Lager selve serveren
    - app er hele server-applikasjonen
    - Her bygger vi routes og regler

````
const express = require('express');
const path = require('path');

const app = express();
````