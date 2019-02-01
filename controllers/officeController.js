import offices from '../models/offices';
import { officeValidator } from '../middleware/schemaValidators';

class OfficeController {
  // Create an Office
  static createOffice(req, res) {
    const office = {
      id: offices.length + 1,
      type: req.body.type,
      name: req.body.name,
    };

    // Prevents Double entry
    const officeExists = offices.find(value => value.type.toUpperCase() === req.body.type.toUpperCase()
      && value.name.toUpperCase() === req.body.name.toUpperCase());

    if (officeExists) {
      return res.status(409).json({
        status: 409,
        error: 'Office Already Exists',
      });
    }

    // Check for Validation Error
    const result = officeValidator(req.body);

    if (result.error) {
      const errorMessage = result.error.details.map(m => m.message.replace(/[^a-zA-Z0-9 ]/g, ''));

      return res.status(422).json({
        status: 422,
        error: errorMessage,
      });
    }
    // No Error
    offices.push(office);
    return res.status(201).json({
      status: 201,
      data: [offices.find(item => item.id === offices.length)],
    });
  }
}

export default OfficeController;
