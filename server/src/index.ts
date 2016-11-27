import * as express from 'express';
import searchHandler from './handlers/search/handler';
const cors = require('cors');

const app = express();

// Enable cross-site requests
app.use(cors());

app.get('/search', searchHandler);

app.listen(3001, () => {
  console.log('Server is running on port 3001.');
});