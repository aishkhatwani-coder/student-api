const request = require('supertest');
const app = require('./app');

describe('Student Service CI Test Suite', () => {
  it('GET / should respond with 200 and success status', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
  });

  it('GET /api/students should return all student records', async () => {
    const res = await request(app).get('/api/students');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(2);
  });

  it('POST /api/students should add a student successfully', async () => {
    const payload = { name: 'Aarav Gupta', marks: 78 };
    const res = await request(app).post('/api/students').send(payload);

    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe('success');
    expect(res.body.data.name).toBe('Aarav Gupta');
    expect(res.body.data.passed).toBe(true);
  });

  it('POST /api/students should fail if marks are missing', async () => {
    const res = await request(app).post('/api/students').send({ name: 'Rahul' });
    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe('failed');
  });
});