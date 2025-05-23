// Mock data for plants
let plants = [
    { id: 1, name: 'Aloe Vera', species: 'Aloe' },
    { id: 2, name: 'Snake Plant', species: 'Sansevieria' },
    { id: 3, name: 'Peace Lily', species: 'Spathiphyllum' }
];

// Helper functions for CRUD operations
function getAll() {
    return plants;
}

function getById(id) {
    return plants.find(p => p.id === Number(id));
}

function create(plant) {
    const newPlant = { id: plants.length ? plants[plants.length - 1].id + 1 : 1, ...plant };
    plants.push(newPlant);
    return newPlant;
}

function update(id, data) {
    const idx = plants.findIndex(p => p.id === Number(id));
    if (idx === -1) return null;
    plants[idx] = { ...plants[idx], ...data };
    return plants[idx];
}

function remove(id) {
    const idx = plants.findIndex(p => p.id === Number(id));
    if (idx === -1) return false;
    plants.splice(idx, 1);
    return true;
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};
