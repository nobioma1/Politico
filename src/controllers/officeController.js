import db from '../db';
import { officeValidator, candidateValidator } from '../middleware/schemaValidators';
import auth from '../middleware/auth';

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
    const createQuery = 'INSERT INTO offices (type, name) VALUES ($1, $2) RETURNING *';
    const values = [type, name];

    // Validates request from consumer
    const validate = officeValidator(req.body);
    if (validate.error) {
      const errorMessage = validate.error.details.map(m => m.message.replace(/[^a-zA-Z0-9 ]/g, ''));
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
   * Gets a single office, using the id of the office
   * passed in the request.
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
    const getOfficeQuery = 'SELECT * FROM offices WHERE office_id = $1';

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

  /**
  * Register a user as a candidate running for a political office.
  * Only accesible by an admin.
  * @static
  * @param {*} req
  * Request
  * @param {*} res
  * Response
  * @returns
  * Returns an object having status of the request sent and
  * a key value having the data returned.
  * @memberof OfficeController
  */
  static async registerCandidate(req, res) {
    // Gets the passed in the token generated on authentication
    const user = auth.identifyAdmin(req);
    if (user.isAdmin === true) {
      const allOfficesQuery = 'SELECT * FROM offices';
      const createCandidateQuery = 'INSERT INTO candidates (office_id, user_id) VALUES ($1, $2) RETURNING *';
      try {
        const allOffices = await db.query(allOfficesQuery);

        // checks count of  offices and returns a No office information for user
        if (allOffices.rowCount === 0) {
          return res.status(200).json({
            status: 200,
            data: 'No Office to select',
          });
        }

        // Validates request from consumer
        const validate = candidateValidator(req.body);
        if (validate.error) {
          const errorMessage = validate.error.details.map(m => m.message.replace(/[^a-zA-Z0-9 ]/g, ''));
          return res.status(422).json({
            status: 422,
            error: errorMessage,
          });
        }

        const { rows } = await db.query(createCandidateQuery, [req.body.office_id, req.body.user_id]);
        return res.status(201).json({
          status: 201,
          data: {
            office: rows[0].office_id,
            user: rows[0].user_id,
          },
        });
      } catch (error) {
        return res.status(409).json({
          status: 409,
          error: 'Already Exists',
        });
      }
    }
    return res.status(401).json({
      status: 401,
      error: 'Unauthorized',
    });
  }
}

export default OfficeController;
