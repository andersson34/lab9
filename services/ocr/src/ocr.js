function extractText(content) {
  if (typeof content !== 'string') {
    throw new Error('content must be a string');
  }

  const text = content.replace(/\s+/g, ' ').trim();
  const wordCount = text.length === 0 ? 0 : text.split(' ').length;

  return {
    text,
    wordCount,
    extractedAt: new Date().toISOString()
  };
}

module.exports = { extractText };
