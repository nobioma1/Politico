import { Router } from 'express';
import OfficeController from '../controllers/officeController';
import { validate, schema } from '../middleware/schemaValidators';

const officeRouter = Router();

// Route calling the required class methods in the Office Controller class
officeRouter.post('/', validate(schema.officeSchema), OfficeController.createOffice);
officeRouter.get('/', OfficeController.getAllOffices);
officeRouter.get('/:id', OfficeController.getAnOffice);
officeRouter.post('/register', validate(schema.candidateSchema), OfficeController.registerCandidate);
officeRouter.get('/:office_id/candidate', OfficeController.getCandidateOffice);
officeRouter.get('/:id/result', OfficeController.getResult);

export default officeRouter;
