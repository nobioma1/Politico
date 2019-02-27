import db from '../db';
import helpers from './helpers';
import auth from '../middleware/auth';
import { userValidator, loginValidator } from '../middleware/schemaValidators';

class UserController {
  /**
   * @static
   * @param {*} req contains params firstName, lastName, email, phoneNumber, passportURL
   * @param {*} res sends Object containing newly created user details
   * 
   * - Creates a new user
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
      firstName, lastName, email, phoneNumber, passportURL,
    } = req.body;

    // hash password to be dsaved on the database
    const hashedPassword = helpers.hashPassword(req.body.password);

    const newUserQuery = `INSERT INTO
      users(firstName, lastName, email, password, phoneNumber, passportURL)
      VALUES($1, $2, $3, $4, $5, $6) RETURNING user_id, firstName, lastName, email, phoneNumber, passportURL, isadmin`;
    const values = [firstName.trim(), lastName.trim(), email, hashedPassword, phoneNumber.trim(), passportURL.trim()];

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
   * @static
   * @param {*} req
   * @param {*} res sends an object of all users
   *
   * - To get all Exsisting users
   * @memberof UserController
   */
  static async getUsers(req, res) {
    const allUsersQuery = 'SELECT user_id, firstname, lastname, passporturl FROM users';
    const user = auth.tokenBearer(req);
    if (user.isAdmin === true) {
      try {
        const { rows } = await db.query(allUsersQuery);
        return res.status(200).json({
          status: 200,
          data: rows,
        });
      } catch (error) {
        return res.status(500).json({
          status: 500,
          error: 'Unable to get all Users!! Server Error, Please Try Again',
        });
      }
    }
  }

  /**
   * @static
   * @param {*} req request, contains email and password
   * @param {*} res response, sends users credentials on login successful
   *
   * - Logging in an existing user
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
      // Check for user existance in db
      if (!rows[0]) {
        return res.status(400).send({
          status: 400,
          error: 'Invalid User Credentials',
        });
      }

      // compares the password on request with password retrieved from db and returns a Boolean
      const comparePassword = helpers.compareHashPassword(req.body.password, rows[0].password);

      if (!comparePassword) {
        return res.status(400).send({
          status: 400,
          error: 'Invalid User Credentials',
        });
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
              isAdmin: rows[0].isadmin,
            },
          },
        ],
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
