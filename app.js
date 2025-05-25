const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const plantRoutes = require('./routes/plantRoutes');
const growthLogRoutes = require('./routes/growthLogRoutes');
const initDb = require('./db/initDb');


const app = express();

app.use(cors());

const dbDir = path.join(__dirname, 'db');
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir);
}

const dbPath = path.join(dbDir, 'greenthumb.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Could not connect to SQLite database', err);
    } else {
        initDb(db);
        console.log('Connected to SQLite database');
    }
});

app.use((req, res, next) => {
    req.db = db;
    next();
});

app.use(express.json());


app.use('/api/plants', plantRoutes);
app.use('/api/growthlogs', growthLogRoutes);

module.exports = app;
