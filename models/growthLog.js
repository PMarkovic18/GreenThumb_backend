// Mock data for growth logs
let growthLogs = [
    { id: 1, plantID: 1, date: '2024-05-01', height: 15, note: 'Healthy growth' },
    { id: 2, plantID: 1, date: '2024-06-01', height: 18, note: 'Added fertilizer' },
    { id: 3, plantID: 2, date: '2024-05-10', height: 22, note: 'Repotted' }
];

// Helper functions for CRUD operations
function getAll() {
    return growthLogs;
}

function getById(id) {
    return growthLogs.find(l => l.id === Number(id));
}

function create(log) {
    const newLog = { id: growthLogs.length ? growthLogs[growthLogs.length - 1].id + 1 : 1, ...log };
    growthLogs.push(newLog);
    return newLog;
}

function update(id, data) {
    const idx = growthLogs.findIndex(l => l.id === Number(id));
    if (idx === -1) return null;
    growthLogs[idx] = { ...growthLogs[idx], ...data };
    return growthLogs[idx];
}

function remove(id) {
    const idx = growthLogs.findIndex(l => l.id === Number(id));
    if (idx === -1) return false;
    growthLogs.splice(idx, 1);
    return true;
}

function getByPlantId(plantID) {
    return growthLogs.filter(l => l.plantID === Number(plantID));
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    getByPlantId
};
