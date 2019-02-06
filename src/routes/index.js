import express from 'express';

import officeRouter from './officesRoute';
import partiesRouter from './partiesRoute';

// Instance of express
const app = express();

app.use('/api/v1/parties', partiesRouter);
app.use('/api/v1/offices', officeRouter);

export default app;
