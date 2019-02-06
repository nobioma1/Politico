import { Router } from 'express';
import PartyController from '../controllers/PartyController';

const partyRouter = Router();

// Route calling the required class methods in the Party Controller class
partyRouter.post('/', PartyController.createParty);
partyRouter.get('/', PartyController.getAllParties);
partyRouter.put('/:id', PartyController.editParty);
partyRouter.get('/:id', PartyController.getAParty);
partyRouter.delete('/:id', PartyController.deleteParty);


export default partyRouter;
