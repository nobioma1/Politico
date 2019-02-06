import { Router } from 'express';
import OfficeController from '../controllers/OfficeController';

const officeRouter = Router();

// Route calling the required class methods in the Office Controller class
officeRouter.post('/', OfficeController.createOffice);
officeRouter.get('/', OfficeController.getAllOffices);
officeRouter.get('/:id', OfficeController.getAnOffice);

export default officeRouter;
