const request = require('supertest');
const { createApp } = require('../../src/app');
const { extractText } = require('../../src/ocr');

describe('ocr extraction', () => {
  test('normalizes whitespace and counts words', () => {
    const result = extractText('  hola   mundo  capstone  ');
    expect(result.text).toBe('hola mundo capstone');
    expect(result.wordCount).toBe(3);
    expect(typeof result.extractedAt).toBe('string');
  });

  test('health endpoint returns ok', async () => {
    const app = createApp();
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ service: 'ocr', status: 'ok' });
  });

  test('extract endpoint validates payload', async () => {
    const app = createApp();
    const response = await request(app).post('/extract').send({ content: 'abc' });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('documentId is required');
  });
});
