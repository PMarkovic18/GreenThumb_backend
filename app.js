const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const plantRoutes = require('./routes/plantRoutes');
const growthLogRoutes = require('./routes/growthLogRoutes');
const initDb = require('./db/initDb');


const app = express();

// Enable CORS for all routes
app.use(cors());

// Ensure db directory exists
const dbDir = path.join(__dirname, 'db');
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir);
}

// Initialize SQLite database
const dbPath = path.join(dbDir, 'greenthumb.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Could not connect to SQLite database', err);
    } else {
        // Seed/init database (tables and data) in initDb
        initDb(db);
        console.log('Connected to SQLite database');
    }
});

// Make db accessible in routes via req.db
app.use((req, res, next) => {
    req.db = db;
    next();
});

// Middleware
app.use(express.json());


// Routes
app.use('/api/plants', plantRoutes);
app.use('/api/growthlogs', growthLogRoutes);

module.exports = app;
