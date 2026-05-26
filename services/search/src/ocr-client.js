const axios = require('axios');

function createOcrClient(baseUrl) {
  return async function extract(documentId, content) {
    const response = await axios.post(`${baseUrl}/extract`, { documentId, content }, { timeout: 5000 });
    return response.data;
  };
}

module.exports = { createOcrClient };
