const { createApp } = require('./app');

const PORT = Number(process.env.PORT || 8081);
const app = createApp();

app.listen(PORT, '0.0.0.0', () => {
  process.stdout.write(`ocr-service listening on ${PORT}\n`);
});
