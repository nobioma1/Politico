import { Router } from 'express';
import OfficeController from '../controllers/officeController';

const router = Router();

router.post('/', OfficeController.createOffice);
router.get('/', OfficeController.getAllOffices);
router.get('/:id', OfficeController.getAnOffice);


export default router;
