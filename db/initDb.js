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

        db.get('SELECT COUNT(*) as count FROM plants', (err, row) => {
            if (!err && row.count === 0) {
                db.run('INSERT INTO plants (name, species) VALUES (?, ?)', ['Aloe Vera', 'Aloe']);
                db.run('INSERT INTO plants (name, species) VALUES (?, ?)', ['Snake Plant', 'Sansevieria']);
                db.run('INSERT INTO plants (name, species) VALUES (?, ?)', ['Peace Lily', 'Spathiphyllum']);
                db.run('INSERT INTO plants (name, species) VALUES (?, ?)', ['Spider Plant', 'Chlorophytum']);
                db.run('INSERT INTO plants (name, species) VALUES (?, ?)', ['Fiddle Leaf Fig', 'Ficus lyrata']);
                db.run('INSERT INTO plants (name, species) VALUES (?, ?)', ['Pothos', 'Epipremnum aureum']);
            }
        });

        db.get('SELECT COUNT(*) as count FROM growth_logs', (err, row) => {
            if (!err && row.count === 0) {
                db.run('INSERT INTO growth_logs (plantID, date, height, note) VALUES (?, ?, ?, ?)', [1, '01.05.2024.', 15, 'Healthy growth']);
                db.run('INSERT INTO growth_logs (plantID, date, height, note) VALUES (?, ?, ?, ?)', [1, '01.06.2024.', 18, 'Added fertilizer']);
                db.run('INSERT INTO growth_logs (plantID, date, height, note) VALUES (?, ?, ?, ?)', [2, '10.05.2024.', 22, 'Repotted']);
                db.run('INSERT INTO growth_logs (plantID, date, height, note) VALUES (?, ?, ?, ?)', [2, '15.06.2024.', 25, 'New leaves appeared']);
                db.run('INSERT INTO growth_logs (plantID, date, height, note) VALUES (?, ?, ?, ?)', [3, '05.05.2024.', 12, 'First bloom']);
                db.run('INSERT INTO growth_logs (plantID, date, height, note) VALUES (?, ?, ?, ?)', [3, '05.06.2024.', 14, 'Bloom faded']);
                db.run('INSERT INTO growth_logs (plantID, date, height, note) VALUES (?, ?, ?, ?)', [4, '12.05.2024.', 20, 'Moved to brighter spot']);
                db.run('INSERT INTO growth_logs (plantID, date, height, note) VALUES (?, ?, ?, ?)', [4, '12.06.2024.', 23, 'Growth spurt']);
                db.run('INSERT INTO growth_logs (plantID, date, height, note) VALUES (?, ?, ?, ?)', [5, '20.05.2024.', 30, 'Pruned lower leaves']);
                db.run('INSERT INTO growth_logs (plantID, date, height, note) VALUES (?, ?, ?, ?)', [5, '20.06.2024.', 33, 'New branch forming']);
                db.run('INSERT INTO growth_logs (plantID, date, height, note) VALUES (?, ?, ?, ?)', [6, '25.05.2024.', 10, 'Planted cutting']);
                db.run('INSERT INTO growth_logs (plantID, date, height, note) VALUES (?, ?, ?, ?)', [6, '25.06.2024.', 15, 'Roots established']);
                db.run('INSERT INTO growth_logs (plantID, date, height, note) VALUES (?, ?, ?, ?)', [1, '15.07.2024.', 20, 'Excellent condition']);
            }
        });
    });
};
