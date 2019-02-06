import express from 'express';

import officeRouter from './officesRoute';
import partiesRouter from './partiesRoute';
import userRouter from './userRoute'

// Instance of express
const app = express();

app.use('/api/v1/auth', userRouter);
app.use('/api/v1/parties', partiesRouter);
app.use('/api/v1/offices', officeRouter);

export default app;
