const express = require('express');
const { extractText } = require('./ocr');

function createApp() {
  const app = express();
  app.use(express.json());

  app.get('/health', (req, res) => {
    res.status(200).json({ service: 'ocr', status: 'ok' });
  });

  app.post('/extract', (req, res) => {
    const { documentId, content } = req.body || {};

    if (!documentId || typeof documentId !== 'string') {
      return res.status(400).json({ error: 'documentId is required' });
    }

    try {
      const extraction = extractText(content);
      return res.status(200).json({ documentId, ...extraction });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  });

  return app;
}

module.exports = { createApp };
