const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/index.html'));

    const sql = "SELECT title, author, year_published FROM books";

    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        res.json(rows);
    });
});

app.listen(3008, () => {
    console.log('Server running on http://localhost:3008');
});