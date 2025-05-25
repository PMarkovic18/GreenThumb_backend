const request = require('supertest');
const app = require('../app'); 

describe('Plant API', () => {
    let createdId;

    it('should create a new plant', async () => {
        const res = await request(app)
            .post('/api/plants')
            .send({ name: 'Test Plant', species: 'Test Species' });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        createdId = res.body.id;
    });

    it('should get all plants', async () => {
        const res = await request(app).get('/api/plants');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should get a plant by id', async () => {
        const res = await request(app).get(`/api/plants/${createdId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.plant).toHaveProperty('id', createdId);
        expect(Array.isArray(res.body.growthLogs)).toBe(true);
    });

    it('should update a plant', async () => {
        const res = await request(app)
            .put(`/api/plants/${createdId}`)
            .send({ name: 'Updated Plant', species: 'Updated Species' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('id', createdId);
    });

    it('should delete a plant', async () => {
        const res = await request(app).delete(`/api/plants/${createdId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message');
    });

    afterAll(async () => {
        if (createdId) {
            await request(app).delete(`/api/plants/${createdId}`);
        }
    });
});
