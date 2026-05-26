const axios = require('axios');

const SEARCH_URL = process.env.SEARCH_URL || 'http://search-service:8082';

describe('capstone e2e', () => {
  test('ingest and search flow', async () => {
    const ingest = await axios.post(`${SEARCH_URL}/ingest`, {
      documentId: 'e2e-1',
      content: 'contenido procesado por ocr y disponible para busqueda'
    });

    expect(ingest.status).toBe(201);
    expect(ingest.data.indexed.documentId).toBe('e2e-1');

    const search = await axios.get(`${SEARCH_URL}/search`, { params: { q: 'busqueda' } });

    expect(search.status).toBe(200);
    expect(search.data.count).toBeGreaterThanOrEqual(1);
    expect(search.data.hits.some((hit) => hit.documentId === 'e2e-1')).toBe(true);
  });
});
