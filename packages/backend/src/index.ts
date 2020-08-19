import '/config'; // loading .env file values
import express from 'express';
import { router } from '/routes';

const app = express()
const port = 3000

// Use /routes/index.js for routing
app.use('/', router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
