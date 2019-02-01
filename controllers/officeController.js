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

  // To Get all Office
  static getAllOffices(req, res) {
    return res.status(200)
      .json({
        status: 200,
        data: offices,
      });
  }

  // To Get a Particular Office
  static getAnOffice(req, res) {
    const findOffice = offices.find(office => office.id === parseInt(req.params.id, 10));

    if (!findOffice) {
      return res.status(404)
        .json({
          status: 404,
          error: 'Office Not Found',
        });
    }

    return res.status(200)
      .json({
        status: 200,
        data: [findOffice],
      });
  }

}

export default OfficeController;
