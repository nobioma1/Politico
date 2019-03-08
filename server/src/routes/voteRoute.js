import { Router } from 'express';
import auth from '../middleware/auth';
import VoteController from '../controllers/VoteController';
import { schema, validate } from '../middleware/schemaValidators';

const voteRouter = Router();

// Route calling the required class methods in the Vote Controller class
voteRouter.post('/vote', auth.verifyToken, validate(schema.voteSchema), VoteController.vote);
voteRouter.get('/voted/:user', auth.verifyToken, VoteController.userVoted);

export default voteRouter;
