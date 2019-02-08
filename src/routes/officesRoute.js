import { Router } from 'express';
import OfficeController from '../controllers/OfficeController';

const officeRouter = Router();

// Route calling the required class methods in the Office Controller class
officeRouter.post('/', OfficeController.createOffice);
officeRouter.get('/', OfficeController.getAllOffices);
officeRouter.get('/:id', OfficeController.getAnOffice);
officeRouter.get('/:id', OfficeController.getAnOffice);
officeRouter.post('/:id/register', OfficeController.registerCandidate);
officeRouter.get('/:id/result', OfficeController.getResult);

export default officeRouter;
