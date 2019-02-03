import { Router } from 'express';
import PartyController from '../controllers/partyController';

const partyRouter = Router();

partyRouter.post('/', PartyController.createParty);
partyRouter.get('/', PartyController.getAllParties);
partyRouter.put('/:id', PartyController.updateParty);
partyRouter.get('/:id', PartyController.getAParty);
partyRouter.delete('/:id', PartyController.deleteParty);


export default partyRouter;
