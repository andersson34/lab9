const { createApp } = require('./app');
const { createOcrClient } = require('./ocr-client');

const PORT = Number(process.env.PORT || 8082);
const OCR_URL = process.env.OCR_URL || 'http://ocr-service:8081';

const app = createApp({ ocrExtract: createOcrClient(OCR_URL) });

app.listen(PORT, '0.0.0.0', () => {
  process.stdout.write(`search-service listening on ${PORT}\n`);
});
