import db from '../db';
import auth from '../middleware/auth';

class PartyController {
  /**
   * @static
   * @param {*} req request, contains name, hqAddress, logoUrl
   * @param {*} res response, sends object of newly created party
   *
   * - Creates a new party
   * @memberof PartyController
   */
  static async createParty(req, res) {
    // Gets the passed in the token generated on authentication
    const user = auth.tokenBearer(req);

    // check the status of user ADMIN or USER
    if (user.isAdmin === true) {
      const { name, hqAddress } = req.body;
      const createQuery = `INSERT INTO parties(name, hqAddress, logoUrl)
      VALUES ($1, $2, $3) RETURNING *`;
      const values = [name.trim(), hqAddress.trim(), !req.file ? null : req.file.url];

      try {
        const { rows } = await db.query(createQuery, values);
        return res.status(201).send({
          status: 201,
          data: [rows[0]],
        });
      } catch (error) {
        if (error.routine === '_bt_check_unique') {
          return res.status(400).send({
            status: 400,
            error: `Party with '${name.trim()}' already exists`,
          });
        }
        return res.status(500).send({
          status: 500,
          error: 'Unable to Create Party!! Server Error, Try Again',
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
   * @param {*} res response, sends an object of all existing parties
   *
   * - Gets all existing Parties
   * @memberof PartyController
   */
  static async getAllParties(req, res) {
    const allPartiesQuery = 'SELECT * FROM parties ORDER BY created_date DESC';

    try {
      const { rows } = await db.query(allPartiesQuery);
      return res.status(200).send({
        status: 200,
        data: rows,
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        error: 'Unable to get all parties!! Server Error, Please Try Again',
      });
    }
  }

  /**
   * @static
   * @param {*} req request, contains params partyId
   * @param {*} res response, sends object of particular party
   *
   * - Gets a Particular Party
   * @memberof PartyController
   */
  static async getAParty(req, res) {
    const getPartyQuery = 'SELECT * FROM  parties WHERE party_id = $1';

    try {
      const { rows } = await db.query(getPartyQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          error: 'Party do not exist',
        });
      }
      return res.status(200).send({
        status: 200,
        data: [rows[0]],
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        error: 'Unable to get Party!! Server Error, Please Try Again',
      });
    }
  }

  /**
   * @static
   * @param {*} req request, contains name, hqAddress, logoUrl
   * @param {*} res response, sends object of updated party
   *
   * - Updates the details of an exisiting party
   * @memberof PartyController
   */
  static async editParty(req, res) {
    // Gets the passed in the token generated on authentication
    const user = auth.tokenBearer(req);
    if (user.isAdmin === true) {
      const getPartyQuery = 'SELECT * FROM  parties WHERE party_id = $1';
      const editQuery = `UPDATE parties 
      SET name=$1, hqAddress=$2, logoURL=$3
      WHERE party_id=$4 RETURNING *`;

      try {
        const { rows } = await db.query(getPartyQuery, [req.params.id]);
        if (!rows[0]) {
          return res.status(404).send({
            status: 404,
            data: 'Party does not exist',
          });
        }
        const { name, hqAddress } = req.body;
        const values = [
          name.trim(),
          hqAddress.trim(),
          !req.file ? null : req.file.url,
          req.params.id,
        ];
        const response = await db.query(editQuery, values);
        return res.status(200).send({
          status: 200,
          data: [response.rows[0]],
        });
      } catch (error) {
        if (error.routine === '_bt_check_unique') {
          return res.status(400).send({
            status: 400,
            error: 'Party with already exists',
          });
        }
        return res.status(400).send({
          status: 400,
          error: 'Party Edit Not Saved!! Server Error, Please Try Again',
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
   * @param {*} req request, contains id of party to be deleted
   * @param {*} res response, party deleted
   *
   * - Deletes an exisiting party
   * @memberof PartyController
   */
  static async deleteParty(req, res) {
    // Gets the passed in the token generated on authentication
    const user = auth.tokenBearer(req);
    if (user.isAdmin === true) {
      const deleteQuery = 'DELETE FROM parties WHERE party_id=$1 RETURNING *';
      try {
        const { rows } = await db.query(deleteQuery, [req.params.id]);
        if (!rows[0]) {
          return res.status(404).send({
            status: 404,
            data: 'Party does not exist',
          });
        }
        return res.status(204).send({
          status: 204,
          data: 'Item deleted',
        });
      } catch (error) {
        return res.status(500).send({
          status: 500,
          error: 'Party delete not completed!! Server Error, Please Try Again',
        });
      }
    }
    return res.status(401).json({
      status: 401,
      error: 'Unauthorized',
    });
  }
}

export default PartyController;
