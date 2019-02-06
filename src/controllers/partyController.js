import db from '../db';
import { partyValidator } from '../middleware/schemaValidators';

class PartyController {
  /**
   * Creates a new party
   * @static
   * @param {*} req
   * Request
   * @param {*} res
   * Response
   * @returns
   * An Object containing status code and the new office if successful
   * else an error code is returned with description of error
   * @memberof PartyController
   */
  static async createParty(req, res) {
    const { name, hqAddress, logoUrl } = req.body;
    const createQuery = `INSERT INTO 
      parties(name, hqAddress, logoUrl, created_date)
      VALUES ($1, $2, $3, $4)
      RETURNING *`;
    const values = [name.trim(), hqAddress.trim(), logoUrl.trim(), new Date()];

    // validate the request from consumer.
    const validate = partyValidator(req.body);
    if (validate.error) {
      const errorMessage = validate.error.details.map(m => m.message.replace(/[^a-zA-Z0-9 ]/g, ''),);
      return res.status(422).json({
        status: 422,
        error: errorMessage,
      });
    }

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
          error: `Party with '${req.body.name}' already exists`,
        });
      }
      return res.status(500).send({
        status: 500,
        error: 'Unable to Create Party!! Server Error, Try Again',
      });
    }
  }

  /**
   * Gets all parties
   * @static
   * @param {*} req
   * Request
   * @param {*} res
   * Response
   * @returns
   * An Object containing status code and all parties if successful
   * else an error code is returned with description of error
   * @memberof PartyController
   */
  static async getAllParties(req, res) {
    const allPartiesQuery = 'SELECT * FROM parties';

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
   * Get a particular party
   * @static
   * @param {*} req
   * Request
   * @param {*} res
   * Response
   * @returns
   * An Object containing status code and the a particular party if successful
   * else an error code is returned with description of error
   * @memberof PartyController
   */
  static async getAParty(req, res) {
    const getPartyQuery = 'SELECT * FROM  parties WHERE id = $1';

    try {
      const { rows } = await db.query(getPartyQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          data: [],
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
   * Edit a party
   * @static
   * @param {*} req
   * Request
   * @param {*} res
   * Response
   * @returns
   * An Object containing status code and a party if successful
   * else an error code is returned with description of error
   * @memberof PartyController
   */
  static async editParty(req, res) {
    const getPartyQuery = 'SELECT * FROM  parties WHERE id = $1';
    const editQuery = `UPDATE parties 
      SET name=$1, hqAddress=$2, logoURL=$3
      WHERE id=$4 RETURNING *`;

    // validates the data sent by consumer
    const validate = partyValidator(req.body);
    if (validate.error) {
      const errorMessage = validate.error.details.map(m => m.message.replace(/[^a-zA-Z0-9 ]/g, ''),);
      return res.status(422).json({
        status: 422,
        error: errorMessage,
      });
    }
    try {
      const { rows } = await db.query(getPartyQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          data: [],
        });
      }
      const { name, hqAddress, logoUrl } = req.body;
      const values = [
        name.trim(),
        hqAddress.trim(),
        logoUrl.trim(),
        req.params.id,
      ];
      const response = await db.query(editQuery, values);
      return res.status(200).send({
        status: 200,
        data: [response.rows[0]],
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        error: 'Party Edit Not Saved!! Server Error, Please Try Again',
      });
    }
  }

  /**
   * Delete a particular party given the id of the pary
   * @static
   * @param {*} req
   * Request
   * @param {*} res
   * Response
   * @returns
   * An Object containing status code and deleted party if successful
   * else an error code is returned with description of error
   * @memberof PartyController
   */
  static async deleteParty(req, res) {
    const deleteQuery = 'DELETE FROM parties WHERE id=$1 RETURNING *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          data: [],
        });
      }
      return res.status(200).send({
        status: 204,
        data: [rows[0]],
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        error: 'Party delete not completed!! Server Error, Please Try Again',
      });
    }
  }
}

export default PartyController;
