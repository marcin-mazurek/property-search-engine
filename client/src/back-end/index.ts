import * as express from 'express';
import { Response } from 'express';

const app = express();

app.use(express.static('public'));
app.use('/compiled', express.static('src/front-end'));
app.use('/node_modules', express.static('node_modules'));
app.get('/',
  (request: any, response: Response) => response.sendFile('public/index.html', { root: '.' })
);
app.use(
  (request: any, response: Response) => response.status(404).send()
);

app.listen(3000, () => {
  console.log('Client is running on port 3000.');
});