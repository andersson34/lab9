const request = require('supertest');
const { createApp } = require('../../src/app');

function mockExtractor(documentId, content) {
  return Promise.resolve({ documentId, text: content, wordCount: content.split(' ').length, extractedAt: new Date().toISOString() });
}

describe('search service', () => {
  test('indexes and searches documents', async () => {
    const app = createApp({ ocrExtract: mockExtractor });

    const indexed = await request(app)
      .post('/index')
      .send({ documentId: 'doc-1', text: 'capstone ocr search pipeline' });

    expect(indexed.status).toBe(201);

    const result = await request(app).get('/search').query({ q: 'pipeline' });

    expect(result.status).toBe(200);
    expect(result.body.count).toBe(1);
    expect(result.body.hits[0].documentId).toBe('doc-1');
  });

  test('ingest uses OCR extractor', async () => {
    const app = createApp({ ocrExtract: mockExtractor });

    const response = await request(app)
      .post('/ingest')
      .send({ documentId: 'doc-2', content: 'texto desde ocr' });

    expect(response.status).toBe(201);
    expect(response.body.indexed.text).toBe('texto desde ocr');
  });
});
