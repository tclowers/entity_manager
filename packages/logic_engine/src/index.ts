import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, Logic World!');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Service running on http://localhost:${port}`);
});
