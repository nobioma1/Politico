import express from 'express';
import officeRouter from './officesRoute';
import partiesRouter from './partiesRoute';
import userRouter from './userRoute';
import auth from '../middleware/auth';

// Instance of express
const app = express();

// authentication routes
app.use('/api/v1/auth', userRouter);
// parties route with a layer of authentication
app.use('/api/v1/parties', auth.verifyToken, partiesRouter);
// offices route with a layer if authentication
app.use('/api/v1/offices', auth.verifyToken, officeRouter);

export default app;
