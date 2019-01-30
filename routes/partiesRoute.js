import { Router } from 'express';
import PartyController from '../controllers/partyController';

const router = Router();

router.get('/', PartyController.getAllParties);
router.get('/:id', PartyController.getAParty);

module.exports = router;
