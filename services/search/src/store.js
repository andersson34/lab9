class InMemoryIndex {
  constructor() {
    this.documents = new Map();
  }

  index(document) {
    this.documents.set(document.documentId, document);
    return document;
  }

  search(query) {
    const normalized = query.toLowerCase();
    return Array.from(this.documents.values())
      .filter((doc) => doc.text.toLowerCase().includes(normalized))
      .sort((a, b) => {
        const aScore = a.text.toLowerCase().split(normalized).length - 1;
        const bScore = b.text.toLowerCase().split(normalized).length - 1;
        return bScore - aScore;
      });
  }
}

module.exports = { InMemoryIndex };
