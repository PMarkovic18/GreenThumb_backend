const Plant = require('../models/plant');

// Create a new plant
exports.createPlant = (req, res) => {
    try {
        const plant = Plant.create(req.body);
        res.status(201).json(plant);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all plants
exports.getPlants = (req, res) => {
    try {
        const plants = Plant.getAll();
        res.json(plants);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single plant by ID
exports.getPlantById = (req, res) => {
    try {
        const plant = Plant.getById(req.params.id);
        if (!plant) return res.status(404).json({ error: 'Plant not found' });
        res.json(plant);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a plant
exports.updatePlant = (req, res) => {
    try {
        const plant = Plant.update(req.params.id, req.body);
        if (!plant) return res.status(404).json({ error: 'Plant not found' });
        res.json(plant);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a plant
exports.deletePlant = (req, res) => {
    try {
        const success = Plant.remove(req.params.id);
        if (!success) return res.status(404).json({ error: 'Plant not found' });
        res.json({ message: 'Plant deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
