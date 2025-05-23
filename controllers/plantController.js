const Plant = require('../models/plant');
const GrowthLog = require('../models/growthLog');

// Create a new plant
exports.createPlant = (req, res) => {
    const { name, species } = req.body;
    req.db.run(
        'INSERT INTO plants (name, species) VALUES (?, ?)',
        [name, species],
        function (err) {
            if (err) return res.status(400).json({ error: err.message });
            req.db.get('SELECT * FROM plants WHERE id = ?', [this.lastID], (err, row) => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json(row ? new Plant(row.id, row.name, row.species) : null);
            });
        }
    );
};

// Get all plants
exports.getPlants = (req, res) => {
    req.db.all('SELECT * FROM plants', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows.map(row => new Plant(row.id, row.name, row.species)));
    });
};

// Get a single plant by ID (with all growth logs)
exports.getPlantById = (req, res) => {
    req.db.get('SELECT * FROM plants WHERE id = ?', [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Plant not found' });
        const plant = new Plant(row.id, row.name, row.species);
        req.db.all('SELECT * FROM growth_logs WHERE plantID = ?', [req.params.id], (err2, logs) => {
            if (err2) return res.status(500).json({ error: err2.message });
            const growthLogs = logs.map(log => new GrowthLog(log.id, log.plantID, log.date, log.height, log.note));
            res.json({ plant, growthLogs });
        });
    });
};

// Update a plant
exports.updatePlant = (req, res) => {
    const { name, species } = req.body;
    req.db.run(
        'UPDATE plants SET name = ?, species = ? WHERE id = ?',
        [name, species, req.params.id],
        function (err) {
            if (err) return res.status(400).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ error: 'Plant not found' });
            req.db.get('SELECT * FROM plants WHERE id = ?', [req.params.id], (err, row) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json(row ? new Plant(row.id, row.name, row.species) : null);
            });
        }
    );
};

// Delete a plant
exports.deletePlant = (req, res) => {
    // First delete all growth logs for this plant
    req.db.run('DELETE FROM growth_logs WHERE plantID = ?', [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        // Now delete the plant itself
        req.db.run('DELETE FROM plants WHERE id = ?', [req.params.id], function (err2) {
            if (err2) return res.status(500).json({ error: err2.message });
            if (this.changes === 0) return res.status(404).json({ error: 'Plant not found' });
            res.json({ message: 'Plant and associated growth logs deleted' });
        });
    });
};
