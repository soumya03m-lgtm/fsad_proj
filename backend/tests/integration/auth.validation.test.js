import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../../src/app.js';

test('POST /api/v1/auth/login rejects invalid payload', async () => {
  const response = await request(app).post('/api/v1/auth/login').send({ email: 'bad-email', password: '123' });
  assert.equal(response.status, 400);
  assert.equal(response.body.success, false);
  assert.equal(response.body.error.code, 'VALIDATION_ERROR');
});

test('POST /api/v1/auth/register rejects missing role', async () => {
  const response = await request(app)
    .post('/api/v1/auth/register')
    .send({ name: 'User', email: 'user@example.com', password: 'password123' });

  assert.equal(response.status, 400);
  assert.equal(response.body.success, false);
  assert.equal(response.body.error.code, 'VALIDATION_ERROR');
});
