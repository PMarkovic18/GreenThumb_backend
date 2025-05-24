const request = require('supertest');
const app = require('../app');

describe('GrowthLog API', () => {
    let plantId;
    let logId;

    beforeAll(async () => {
        // Create a plant to attach growth logs to
        const res = await request(app)
            .post('/api/plants')
            .send({ name: 'Plant for GrowthLog', species: 'Species' });
        plantId = res.body.id;
    });

    afterAll(async () => {
        // Clean up the plant
        await request(app).delete(`/api/plants/${plantId}`);
    });

    it('should create a new growth log', async () => {
        const res = await request(app)
            .post('/api/growthLogs')
            .send({ plantID: plantId, date: '01.01.2025.', height: 10, note: 'First log' });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        logId = res.body.id;
    });

    it('should get all growth logs', async () => {
        const res = await request(app).get('/api/growthLogs');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should get a growth log by id', async () => {
        const res = await request(app).get(`/api/growthLogs/${logId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', logId);
    });

    it('should update a growth log', async () => {
        const res = await request(app)
            .put(`/api/growthLogs/${logId}`)
            .send({ plantID: plantId, date: '01.01.2025.', height: 12, note: 'Updated log' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', logId);
    });

    it('should delete a growth log', async () => {
        const res = await request(app).delete(`/api/growthLogs/${logId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message');
    });
});
