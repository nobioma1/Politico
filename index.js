import express from 'express';
import bodyParser from 'body-parser';
import logger from './middleware/logger';
import partiesRouter from './routes/partiesRoute';
import officeRouter from './routes/officesRoute';


// Instance of express
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use('/api/v1/parties', partiesRouter);
app.use('/api/v1/offices', officeRouter);


app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`app is running on port ${port}`);
});

export default app;
