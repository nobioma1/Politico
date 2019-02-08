import db from '../db';
import helpers from './helpers';
import { userValidator, loginValidator } from '../middleware/schemaValidators';

class UserController {
  /**
   * Creates a new User
   * @static
   * @param {*} req
   * Request
   * @param {*} res
   * Response
   * @returns
   * An Object containing status code token and newly created user if successful
   * else an error code is returned with description of error
   * @memberof UserController
   */
  static async createUser(req, res) {
    // validates the request from the consumer
    const validate = userValidator(req.body);
    if (validate.error) {
      const errorMessage = validate.error.details.map(m => m.message.replace(/[^a-zA-Z0-9 ]/g, ''));
      return res.status(422).json({
        status: 422,
        error: errorMessage,
      });
    }

    const {
      firstName, otherNames, lastName, email, phoneNumber, passportURL,
    } = req.body;

    // hash password to be dsaved on the database
    const hashedPassword = helpers.hashPassword(req.body.password);

    const newUserQuery = `INSERT INTO
      users(firstName, otherNames, lastName, email, password, phoneNumber, passportURL)
      VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING firstName, otherNames, lastName, email, phoneNumber, passportURL`;
    const values = [firstName.trim(), otherNames.trim(), lastName.trim(), email, hashedPassword, phoneNumber.trim(), passportURL.trim()];

    try {
      const { rows } = await db.query(newUserQuery, values);
      // generate user token used in verifying and authenticating the user
      const userToken = helpers.generateToken(rows[0].user_id, rows[0].email, rows[0].isadmin);
      return res.status(201).send({
        status: 201,
        data: [{
          token: userToken,
          user: rows[0],
        }],
      });
    } catch (error) {
      // get unique email error from db and returns a more descriptive message
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({
          status: 400,
          error: `User with '${req.body.email}' already exists`,
        });
      }
      return res.status(500).send({
        status: 500,
        error: error.message,
      });
    }
  }

  /**
   * To login a Registered User.
   * @static
   * @param {*} req
   * Response
   * @param {*} res
   * Request
   * @returns
   * An Object containing status code, token and user if successful
   * else an error code is returned with description of error
   * @memberof UserController
   */
  static async loginUser(req, res) {
    const query = 'SELECT * FROM users WHERE email = $1';

    const validate = loginValidator(req.body);
    if (validate.error) {
      const errorMessage = validate.error.details.map(m => m.message.replace(/[^a-zA-Z0-9 ]/g, ''));
      return res.status(422).json({
        status: 422,
        error: errorMessage,
      });
    }

    try {
      const { rows } = await db.query(query, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).send({ message: 'The credentials you provided is incorrect' });
      }

      // compares the password on request with password retrieved from db and returns a Boolean
      const comparePassword = helpers.compareHashPassword(req.body.password, rows[0].password);

      if (!comparePassword) {
        return res.status(400).send('error');
      }
      // generates a token, using id, email and user isAdmin that can be used to identify the user
      const userToken = helpers.generateToken(rows[0].user_id, rows[0].email, rows[0].isadmin);

      return res.status(200).send({
        status: 200,
        data: [
          {
            token: userToken,
            user: {
              user_id: rows[0].user_id,
              firstname: rows[0].firstname,
              othernames: rows[0].othernames,
              lastname: rows[0].lastname,
              email: rows[0].email,
              phonenumber: rows[0].phonenumber,
              passporturl: rows[0].passporturl,
              created_date: rows[0].created_date,
            }
          }
        ]
      });
    } catch (error) {
      return res.status(500).send({
        status: 500,
        error: error.message,
      });
    }
  }
}

export default UserController;
