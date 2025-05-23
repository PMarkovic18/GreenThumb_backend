const GrowthLog = require('../models/growthLog');

// Helper for date validation: "DD.MM.YYYY."
function isValidDateFormat(date) {
    return /^\d{2}\.\d{2}\.\d{4}\.$/.test(date);
}

// Create a new growth log
exports.createGrowthLog = (req, res) => {
    const { plantID, date, height, note } = req.body;
    if (!isValidDateFormat(date)) {
        return res.status(400).json({ error: 'Date must be in format DD.MM.YYYY.' });
    }
    req.db.run(
        'INSERT INTO growth_logs (plantID, date, height, note) VALUES (?, ?, ?, ?)',
        [plantID, date, height, note],
        function (err) {
            if (err) return res.status(400).json({ error: err.message });
            req.db.get('SELECT * FROM growth_logs WHERE id = ?', [this.lastID], (err, row) => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json(row ? new GrowthLog(row.id, row.plantID, row.date, row.height, row.note) : null);
            });
        }
    );
};

// Get all growth logs
exports.getGrowthLogs = (req, res) => {
    req.db.all('SELECT * FROM growth_logs', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows.map(row => new GrowthLog(row.id, row.plantID, row.date, row.height, row.note)));
    });
};

// Get a single growth log by ID
exports.getGrowthLogById = (req, res) => {
    req.db.get('SELECT * FROM growth_logs WHERE id = ?', [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Growth log not found' });
        res.json(new GrowthLog(row.id, row.plantID, row.date, row.height, row.note));
    });
};

// Update a growth log
exports.updateGrowthLog = (req, res) => {
    const { plantID, date, height, note } = req.body;
    if (!isValidDateFormat(date)) {
        return res.status(400).json({ error: 'Date must be in format DD.MM.YYYY.' });
    }
    req.db.run(
        'UPDATE growth_logs SET plantID = ?, date = ?, height = ?, note = ? WHERE id = ?',
        [plantID, date, height, note, req.params.id],
        function (err) {
            if (err) return res.status(400).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ error: 'Growth log not found' });
            req.db.get('SELECT * FROM growth_logs WHERE id = ?', [req.params.id], (err, row) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json(row ? new GrowthLog(row.id, row.plantID, row.date, row.height, row.note) : null);
            });
        }
    );
};

// Delete a growth log
exports.deleteGrowthLog = (req, res) => {
    req.db.run('DELETE FROM growth_logs WHERE id = ?', [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Growth log not found' });
        res.json({ message: 'Growth log deleted' });
    });
};

// Get all growth logs for a specific plant
exports.getGrowthLogsByPlantId = (req, res) => {
    req.db.all('SELECT * FROM growth_logs WHERE plantID = ?', [req.params.plantID], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows.map(row => new GrowthLog(row.id, row.plantID, row.date, row.height, row.note)));
    });
};
