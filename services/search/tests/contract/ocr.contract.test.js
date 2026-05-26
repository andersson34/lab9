const axios = require('axios');

const OCR_URL = process.env.OCR_URL || 'http://ocr-service:8081';

describe('OCR contract', () => {
  test('extract endpoint returns expected schema', async () => {
    const response = await axios.post(`${OCR_URL}/extract`, {
      documentId: 'contract-1',
      content: 'hola contrato de servicio'
    });

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('documentId', 'contract-1');
    expect(response.data).toHaveProperty('text');
    expect(response.data).toHaveProperty('wordCount');
    expect(response.data).toHaveProperty('extractedAt');
    expect(typeof response.data.text).toBe('string');
    expect(typeof response.data.wordCount).toBe('number');
  });
});
