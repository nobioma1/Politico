import { Router } from 'express';
import PartyController from '../controllers/partyController';
import { validate, schema } from '../middleware/schemaValidators';
import upload from '../middleware/uploader';

const partyRouter = Router();

// Route calling the required class methods in the Party Controller class
partyRouter.post('/', upload.single('logoURL'), validate(schema.partySchema), PartyController.createParty);
partyRouter.get('/', PartyController.getAllParties);
partyRouter.put('/:id', upload.single('logoURL'), validate(schema.partySchema), PartyController.editParty);
partyRouter.get('/:id', PartyController.getAParty);
partyRouter.delete('/:id', PartyController.deleteParty);


export default partyRouter;
