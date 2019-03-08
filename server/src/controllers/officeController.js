import db from '../db';
import auth from '../middleware/auth';

class OfficeController {
  /**
   * @static
   * @param {*} req request, contains params type, name
   * @param {*} res response, sends object of newly created office
   *
   * - Creates a new office
   * @memberof OfficeController
   */
  static async createOffice(req, res) {
    // Gets the passed in the token generated on authentication
    const user = auth.tokenBearer(req);
    if (user.isAdmin === true) {
      const { type, name } = req.body;
      const createQuery = 'INSERT INTO offices (type, name) VALUES ($1, $2) RETURNING *';
      const values = [type, name];

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
    return res.status(401).json({
      status: 401,
      error: 'Unauthorized',
    });
  }

  /**
   * @static
   * @param {*} req
   * @param {*} res response, sends object of all existing offices
   *
   * - Gets all existing offices
   * @memberof OfficeController
   */
  static async getAllOffices(req, res) {
    const allOfficesQuery = 'SELECT * FROM offices ORDER BY created_date DESC';

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
   * @static
   * @param {*} req request, contains params officeId
   * @param {*} res response, sends object of particular office
   *
   * - Gets a Particular office
   * @memberof OfficeController
   */
  static async getAnOffice(req, res) {
    const getOfficeQuery = 'SELECT * FROM offices WHERE office_id = $1';

    try {
      const { rows } = await db.query(getOfficeQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          data: 'Office not found',
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
   * @static
   * @param {*} req request, contains params officeId and userId
   * @param {*} res response, sends object newly registered candidate and office
   *
   * - Registering a Candidate for an office
   * @memberof OfficeController
   */
  static async registerCandidate(req, res) {
    // Gets the passed in the token generated on authentication
    const user = auth.tokenBearer(req);
    if (user.isAdmin === true) {
      const getCanNamesQuery = 'SELECT firstname, lastname, passporturl FROM users WHERE user_id=$1';
      const allCandidatesQuery = 'SELECT * FROM candidates WHERE candidate_user=$1';
      const createCandidateQuery = 'INSERT INTO candidates (office, candidate_user, candidate_name, candidate_avatar) VALUES ($1, $2, $3, $4) RETURNING *';
      try {
        const getCanNames = await db.query(getCanNamesQuery, [req.body.candidate_id]);
        const candidates = await db.query(allCandidatesQuery, [req.body.candidate_id]);
        if (candidates.rows[0]) {
          return res.status(400).json({
            status: 400,
            error: 'Already been made candidate',
          });
        }

        const candidateName = `${getCanNames.rows[0].firstname} ${getCanNames.rows[0].lastname}`;
        const { rows } = await db.query(createCandidateQuery, [
          req.body.office_id,
          req.body.candidate_id,
          candidateName,
          getCanNames.rows[0].passporturl,
        ]);
        return res.status(201).json({
          status: 201,
          data: {
            office: rows[0].office,
            user: rows[0].candidate_user,
          },
        });
      } catch (error) {
        return res.status(400).json({
          status: 400,
          error: error.message,
        });
      }
    }
    return res.status(401).json({
      status: 401,
      error: 'Unauthorized',
    });
  }

  /**
   * @static
   * @param {*} req request, contains params officeId
   * @param {*} res response, sends object of candidate where officeId
   *
   * - Gets a candidates office
   * @memberof OfficeController
   */
  static async getCandidateOffice(req, res) {
    const candidateQuery = 'SELECT * FROM candidates WHERE office=$1';
    try {
      const { rows } = await db.query(candidateQuery, [req.params.office_id]);
      return res.status(200).json({
        status: 200,
        data: rows,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Unable to get Candidate!! Server Error, Please Try Again',
      });
    }
  }

  /**
   * @static
   * @param {*} req request, contains params officeId
   * @param {*} res response, sends objects votes for candidate {office, candidate, count}
   *
   * - Gets Result of votes
   * @memberof OfficeController
   */
  static async getResult(req, res) {
    const getResultQuery = `
      SELECT office, candidate, COUNT(candidate) FROM votes WHERE office = $1 
      GROUP BY candidate, office`;
    try {
      const { rows } = await db.query(getResultQuery, [req.params.id]);
      return res.status(200).json({
        status: 200,
        data: rows,
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error: error.message,
      });
    }
  }
}

export default OfficeController;
