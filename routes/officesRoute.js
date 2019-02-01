import { Router } from 'express';
import OfficeController from '../controllers/officeController';

const router = Router();

router.post('/', OfficeController.createOffice);
router.get('/', OfficeController.getAllOffices);

export default router;
