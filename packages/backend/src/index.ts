import '/config'; // loading .env file values
import express from 'express';
import cors from 'cors';
import { router } from '/routes';
const bodyParser = require('body-parser')


const app = express();
const port = 4000;

// Tell server to use CORS middleware
app.use(cors());

// Accept JSON request bodies
app.use(bodyParser.json())

// Use /routes/index.js for routing
app.use('/', router);

app.listen(port, () => {
  console.log(`Back-end API listening at http://localhost:${port}`);
});
