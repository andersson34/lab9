const express = require('express');
const { InMemoryIndex } = require('./store');

function createApp({ ocrExtract }) {
  const app = express();
  const index = new InMemoryIndex();

  app.use(express.json());

  app.get('/health', (req, res) => {
    res.status(200).json({ service: 'search', status: 'ok' });
  });

  app.post('/index', (req, res) => {
    const { documentId, text } = req.body || {};

    if (!documentId || !text) {
      return res.status(400).json({ error: 'documentId and text are required' });
    }

    const created = index.index({
      documentId,
      text,
      indexedAt: new Date().toISOString()
    });

    return res.status(201).json(created);
  });

  app.post('/ingest', async (req, res) => {
    const { documentId, content } = req.body || {};

    if (!documentId || !content) {
      return res.status(400).json({ error: 'documentId and content are required' });
    }

    try {
      const extraction = await ocrExtract(documentId, content);
      const created = index.index({
        documentId: extraction.documentId,
        text: extraction.text,
        indexedAt: new Date().toISOString()
      });

      return res.status(201).json({ indexed: created, extraction });
    } catch (error) {
      return res.status(502).json({ error: 'failed to extract content from OCR service' });
    }
  });

  app.get('/search', (req, res) => {
    const q = String(req.query.q || '').trim();

    if (!q) {
      return res.status(400).json({ error: 'q is required' });
    }

    const hits = index.search(q);
    return res.status(200).json({ query: q, count: hits.length, hits });
  });

  app.get('/documents', (req, res) => {
    return res.status(200).json({ documents: Array.from(index.documents.values()) });
  });

  return app;
}

module.exports = { createApp };
