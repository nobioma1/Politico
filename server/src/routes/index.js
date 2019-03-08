import express from 'express';
import officeRouter from './officesRoute';
import partiesRouter from './partiesRoute';
import userRouter from './userRoute';
import voteRouter from './voteRoute';
import auth from '../middleware/auth';

// Instance of express
const app = express();

// authentication routes
app.use('/auth', userRouter);
// parties route with a layer of authentication
app.use('/parties', auth.verifyToken, partiesRouter);
// offices route with a layer if authentication
app.use('/offices', auth.verifyToken, officeRouter);
// vote route with a layer of authenthication
app.use('/', auth.verifyToken, voteRouter);

export default app;
