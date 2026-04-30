const express = require('express');
const path = require('path');
const mariadb = require('mariadb');
require('dotenv').config();

const app = express();

app.use(express.json());

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    connectionLimit: parseInt(process.env.DB_LIMIT) || 5
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/index.html'));
});

app.get('/books', async (req, res) => {

    let conn;

    try {
        conn = await pool.getConnection();

        const books = await conn.query(
            "SELECT title, author, year_published FROM books"
        );

        res.json(books);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });

    } finally {
        if (conn) conn.end();
    }

});

app.listen(3008, () => {
    console.log('Server running on http://localhost:3008');
});