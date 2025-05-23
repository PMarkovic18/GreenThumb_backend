module.exports = function initDb(db) {
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS plants (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            species TEXT NOT NULL
        )`);
        db.run(`CREATE TABLE IF NOT EXISTS growth_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            plantID INTEGER NOT NULL,
            date TEXT NOT NULL,
            height REAL,
            note TEXT,
            FOREIGN KEY (plantID) REFERENCES plants(id)
        )`);

        // Check if plants table is empty
        db.get('SELECT COUNT(*) as count FROM plants', (err, row) => {
            if (!err && row.count === 0) {
                db.run('INSERT INTO plants (name, species) VALUES (?, ?)', ['Aloe Vera', 'Aloe']);
                db.run('INSERT INTO plants (name, species) VALUES (?, ?)', ['Snake Plant', 'Sansevieria']);
                db.run('INSERT INTO plants (name, species) VALUES (?, ?)', ['Peace Lily', 'Spathiphyllum']);
            }
        });

        // Check if growth_logs table is empty
        db.get('SELECT COUNT(*) as count FROM growth_logs', (err, row) => {
            if (!err && row.count === 0) {
                db.run('INSERT INTO growth_logs (plantID, date, height, note) VALUES (?, ?, ?, ?)', [1, '2024-05-01', 15, 'Healthy growth']);
                db.run('INSERT INTO growth_logs (plantID, date, height, note) VALUES (?, ?, ?, ?)', [1, '2024-06-01', 18, 'Added fertilizer']);
                db.run('INSERT INTO growth_logs (plantID, date, height, note) VALUES (?, ?, ?, ?)', [2, '2024-05-10', 22, 'Repotted']);
            }
        });
    });
};
