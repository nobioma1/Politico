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

  // Edit an Office
  static updateOffice(req, res) {
    const editOffice = offices.find(office => office.id === parseInt(req.params.id, 10));

    if (!editOffice) {
      res.status(404).json({
        status: 404,
        error: 'Not Found, Office Edit Unsuccesful',
      });
    }

    // Prevents Double entry
    const officeExists = offices.find(value => value.type.toUpperCase() === req.body.type.toUpperCase()
      && value.name.toUpperCase() === req.body.name.toUpperCase());

    if (officeExists) {
      return res.status(409).json({
        status: 409,
        error: 'Office Already Exists',
      });
    }

    // Validate input
    const result = officeValidator(req.body);

    if (result.error) {
      return res.status(422).json({
        status: 422,
        error: 'Validation Failed, Check Input',
      });
    }

    // update office
    offices[req.params.id - 1].type = req.body.type;
    offices[req.params.id - 1].name = req.body.name;

    return res.status(200).json({
      status: 200,
      data: [offices.find(item => item.id === parseInt(req.params.id, 10))],
    });
  }
}

export default OfficeController;
