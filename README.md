# Node.js + express - a crash course
Node.js er et program som lar deg kjøre JavaScript utenfor nettleseren.
Normalt kjører JavaScript i nettleseren (Chrome, Firefox osv.), men med Node kan du:
- lage servere
- lagre data
- bygge API-er
- koble frontend og backend

*Hva er målet for dagen? - Bygge en “mini-nettside-server”*

**Målet er at du skal kunne:**
- Lage en basic HTML side
- Koble en HTML-fil til en Node.js server
- Ikke bruke “Go Live” men heller terminalen

**Installasjoner**

Opprett en ny mappe og åpne den i VScode

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

***STEG 1 - Grunnleggende oppsett i server.js***

````
const express = require('express');
const path = require('path');

const app = express();
````

- Importere Express-bibliotek
    - Gjør det mulig å lage server raskt
    - Gir oss funksjoner som app.get() og app.listen()

- Innebygd Node-modul
    - Hjelper oss å jobbe med filstier
    - Brukes for å finne filer som HTML

- Lager selve serveren
    - app er hele server-applikasjonen
    - Her bygger vi routes og regler

***STEG 2 - Route (Koble til HTML)***

````
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
````

Når noen går til / (hovedsiden):
- serveren mottar request (req)
- serveren sender response (res)
- den sender tilbake en HTML-fil

app.get('/')
- Lager en route (URL)
- / = forsiden av nettsiden

(req, res) => {}
- req = request (det brukeren sender)
- res = response (det serveren sender tilbake)

res.sendFile(...)
- Sender HTML-fil til nettleseren

__dirname
- betyr “mappen denne filen ligger i”

path.join(...)
- lager riktig filsti
- fungerer på Mac, Windows og Linux

***STEG 3 - Start serveren***

```
app.listen(3003, () => {
    console.log('Server running on http://localhost:3003');
});
```
Hva skjer her?
- 3003 = port nummer
- serveren kjører på http://localhost:3003

---
Del 2 - Koble til SQL
---
Nå skal vi ta serveren ett steg videre

Vi skal
- koble Node.js til en database
- hente data fra en tabell 
- lage API-endpoints (/api/users, /filter)
- bruke .env for sikkerhet
- skjule sensitive data fra koden
- strukturere prosjektet litt mer “ekte backend”

**Steg 1- Installasjoner**

Dette kurset baserer seg på MariaDB
```
brew install mariadb

npm install dotenv
```

**Steg 2- Koble Node.js til Databasen**

*Legg til disse to filene i rot mappen*
```
.env
.gitignore
```

.env filen inneholder sensitiv data som:
````
DB_HOST=localhost
DB_USER=root
DB_PASS=passord
DB_DATABASE=mydb
DB_LIMIT=5
````
.gitignore bestemmer vi hva som IKKE skal lastes opp til GitHub:
````
node_modules
.env
````
Det ligger en eksempel SQL tabell i repo-et om dere vil teste ut.

**Steg 3- Koble databasen til server.js**

Server.js:
Laster inn:
- database-driver
- miljøvariabler fra .env
```
const mariadb = require('mariadb');
require('dotenv').config();
```

Koble til databasen:
- bruker info fra .env
- pool = flere koblinger samtidig (mer effektivt)
````
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    connectionLimit: parseInt(process.env.DB_LIMIT) || 5
});
````

**Steg 4- Hente data fra databasen til API-endpoint**

Når vi koblet index.html til serveren brukte vi **app.get** som betyr at vi ber node å hente data
Nå skal vi bruke **HTTP-metoden (GET)** til å hente data fra databasen

Vi skal begynne med å lage en API-endpoint- det som sender data til server.js.
```
app.get('/books', async (req, res) => {
    *Her skal vi få inn data*
});
```
Koble til databasen:
```
conn = await pool.getConnection();
```

Hente data fra tabeller:
````
const books = await conn.query(
    "SELECT title, author, year_published FROM books"
);
````

Sende data tilbake:
`````
res.json(books);
`````

*TIPS! - Legg til error handling*
````
catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
}
````

Lukke connection
`````
finally {
    if (conn) conn.end();
}
`````

**Steg 5- Vise data på forsiden**

Nå jobber vi med index.html
Inn i script skal vi hente data fra endpoint til forsiden vår

````
const response = await fetch("/books");
const books = await response.json();
````
Dette sender request til server (/books) og får JSON tilbake

For å vise data på siden:
````
books.forEach(book => {
    container.innerHTML += `
        <p>
            ${book.title} - ${book.author} (${book.year_published})
        </p>
    `;
});
````
Looper gjennom alle bøker og viser dem

*Feil melding?*
````
catch (error) {
    document.getElementById("userData").innerHTML =
        "<p>Kunne ikke hente bøker</p>";
}
````
Dette viser deg feilmeldingen i stedet for å krasje helt

Start server med nodemon server.js

Du kan også se JSON direkte ved å gå inn på
```
http://localhost:3003/books
```
