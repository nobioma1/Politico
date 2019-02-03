import { Router } from 'express';
import OfficeController from '../controllers/officeController';

const officeRouter = Router();

officeRouter.post('/', OfficeController.createOffice);
officeRouter.get('/', OfficeController.getAllOffices);
officeRouter.put('/:id', OfficeController.updateOffice);
officeRouter.get('/:id', OfficeController.getAnOffice);

export default officeRouter;
