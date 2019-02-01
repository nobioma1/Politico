import { Router } from 'express';
import PartyController from '../controllers/partyController';

const router = Router();

router.get('/', PartyController.getAllParties);
router.get('/:id', PartyController.getAParty);
router.post('/', PartyController.createParty);
router.put('/:id', PartyController.updateParty);


export default router;
