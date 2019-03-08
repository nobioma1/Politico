import express from 'express';
import 'babel-polyfill';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';
import routes from './src/routes/index';
import logger from './src/middleware/logger';

dotenv.config();

// Instance of express
const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Serving Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Serving static files, images
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('Welcome to Politico v1');
});

app.use('/api/v1', routes);

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});

export default app;
