import db from '../db';
import { officeValidator } from '../middleware/schemaValidators';

class OfficeController {
  /**
   * Creates a new office
   * @static
   * @param {*} req
   * // Request
   * @param {*} res
   * // Response
   * @returns
   * // An Object containing status code and the new data if useful
   * //else an error code is returned with description of error
   * @memberof OfficeController
   */
  static async createOffice(req, res) {
    const { type, name } = req.body;
    const createQuery = `INSERT INTO 
      offices(type, name, created_date)
      VALUES ($1, $2, $3)
      RETURNING *`;
    const values = [type.trim(), name.trim(), new Date()];

    // Validates request from consumer
    const validate = officeValidator(req.body);
    if (validate.error) {
      const errorMessage = validate.error.details.map(m => m.message.replace(/[^a-zA-Z0-9 ]/g, ''),);
      return res.status(422).json({
        status: 422,
        error: errorMessage,
      });
    }

    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).json({
        status: 201,
        data: [rows[0]],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Unable to Create Office!! Server Error, Try Again',
      });
    }
  }

  /**
   * Get All the offices
   * @static
   * @param {*} req
   * Request
   * @param {*} res
   * Response
   * @returns
   * An Object containing status code and all offices
   * else an error code is returned with description of error
   * @memberof OfficeController
   */
  static async getAllOffices(req, res) {
    const allOfficesQuery = 'SELECT * FROM offices';

    try {
      const { rows } = await db.query(allOfficesQuery);
      return res.status(200).json({
        status: 200,
        data: rows,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Unable to get all Offices!! Server Error, Please Try Again',
      });
    }
  }

  /**
   * Get's a single office, using the id of the office
   * passed in the request
   * @static
   * @param {*} req
   * Request
   * @param {*} res
   * Response
   * @returns
   * returns an Object containing status code and the office matching
   * the id on the request passed
   * else an error code is returned with description of error
   * @memberof OfficeController
   */
  static async getAnOffice(req, res) {
    const getOfficeQuery = 'SELECT * FROM offices WHERE id = $1';

    try {
      const { rows } = await db.query(getOfficeQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          data: [],
        });
      }
      return res.status(200).json({
        status: 200,
        data: [rows[0]],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Unable to get Office!! Server Error, Please Try Again',
      });
    }
  }
}

export default OfficeController;
