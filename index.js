import express from 'express';
import bodyParser from 'body-parser';
import logger from './middleware/logger';
import routes from './routes/index';

// Instance of express
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.get('/', (req, res) => {
  res.send('Welcome to Politico v1');
});

app.use('/', routes);

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});

export default app;
