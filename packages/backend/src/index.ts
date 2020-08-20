import '/config'; // loading .env file values
import express from 'express';
import cors from 'cors';
import { router } from '/routes';

const app = express();
const port = 4000;

// Tell server to use CORS middleware
app.use(cors());

// Use /routes/index.js for routing
app.use('/', router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
