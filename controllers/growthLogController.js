const GrowthLog = require('../models/growthLog');

// Create a new growth log
exports.createGrowthLog = (req, res) => {
    try {
        const log = GrowthLog.create(req.body);
        res.status(201).json(log);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all growth logs
exports.getGrowthLogs = (req, res) => {
    try {
        const logs = GrowthLog.getAll();
        res.json(logs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single growth log by ID
exports.getGrowthLogById = (req, res) => {
    try {
        const log = GrowthLog.getById(req.params.id);
        if (!log) return res.status(404).json({ error: 'Growth log not found' });
        res.json(log);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a growth log
exports.updateGrowthLog = (req, res) => {
    try {
        const log = GrowthLog.update(req.params.id, req.body);
        if (!log) return res.status(404).json({ error: 'Growth log not found' });
        res.json(log);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a growth log
exports.deleteGrowthLog = (req, res) => {
    try {
        const success = GrowthLog.remove(req.params.id);
        if (!success) return res.status(404).json({ error: 'Growth log not found' });
        res.json({ message: 'Growth log deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all growth logs for a specific plant
exports.getGrowthLogsByPlantId = (req, res) => {
    try {
        const logs = GrowthLog.getByPlantId(req.params.plantID);
        res.json(logs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
