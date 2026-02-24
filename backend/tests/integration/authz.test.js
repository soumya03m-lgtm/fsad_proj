import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../../src/app.js';

test('GET /api/v1/courses requires bearer token', async () => {
  const response = await request(app).get('/api/v1/courses');
  assert.equal(response.status, 401);
  assert.equal(response.body.success, false);
  assert.equal(response.body.error.code, 'UNAUTHORIZED');
});

test('GET /api/v1/analytics/overview requires bearer token', async () => {
  const response = await request(app).get('/api/v1/analytics/overview');
  assert.equal(response.status, 401);
  assert.equal(response.body.success, false);
  assert.equal(response.body.error.code, 'UNAUTHORIZED');
});
