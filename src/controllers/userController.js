import db from '../db';
import helpers from './helpers';
import { userValidator } from '../middleware/schemaValidators';

class UserController {
  static createUser(req, res) {
    const validate = userValidator(req.body);
    if (validate.error) {
      const errorMessage = validate.error.details.map(m => m.message.replace(/[^a-zA-Z0-9 ]/g, ''));
      return res.status(422).json({
        status: 422,
        error: errorMessage,
      });
    }

    const {
      firstName, otherNames, lastName, email, phoneNumber, passportURL, isAdmin,
    } = req.body;

    const hashedPassword = helpers.hashPassword(req.body.password);

    const newUserQuery = `INSERT INTO
      users(firstName, otherNames, lastName, email, password, phoneNumber, passportURL, isAdmin, created_date)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`;
    const values = [
      firstName, otherNames, lastName, email, hashedPassword, phoneNumber, passportURL, isAdmin, new Date(),
    ];

    try {
      const { rows } = db.query(newUserQuery, values);
      const userToken = helpers.generateToken(rows[0].id, rows[0].email);
      return res.status(201).send({
        status: 201,
        data: [{
          token: userToken,
          user: rows[0],
        }],
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({
          status: 400,
          error: `User with '${req.body.email}' already exists`,
        });
      }
      return res.status(500).send({
        status: 500,
        error: 'Server Error, Please Try Again',
      });
    }
  }
}

export default UserController;
