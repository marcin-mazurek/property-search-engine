import * as express from 'express';
import { Response } from 'express';

const app = express();

app.use(express.static('public'));
app.use('/node_modules', express.static('node_modules'));
app.use(
  (request: any, response: Response) => response.sendFile('public/index.html', { root: '.' })
);

app.listen(3000, () => {
  console.log('Client is running on port 3000.');
});