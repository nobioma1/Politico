import express from 'express';
import 'babel-polyfill';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import routes from './src/routes/index';

dotenv.config();

// Instance of express
const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to Politico v1');
});

app.use('/', routes);

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});

export default app;