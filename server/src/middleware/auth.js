import jwt from 'jsonwebtoken';
import db from '../db';

const auth = {
  /**
   * Verifies the token sent along with a logged in user
   * @param {*} req
   * Rest
   * @param {*} res
   * Response
   * @param {*} next
   * passing the control to the next function
   * @returns
   * Returns error codes and message if unsuccessful
   */
  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(400).send({
        status: 400,
        error: 'Token not Provided',
      });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      const query = 'SELECT * FROM users WHERE user_id = $1 AND email = $2';
      const { rows } = await db.query(query, [decoded.userId, decoded.userEmail]);
      if (!rows[0]) {
        return res.status(400).send({
          status: 400,
          error: 'Invalid Token',
        });
      }
      next();
    } catch (error) {
      return res.status(400).send({
        status: 400,
        error: error.message,
      });
    }
  },

  /**
* Decrypts the token to acess user authentication values passed
* within the token.
* @param {*} req
* Request
* @param {*} res
* Response
* @returns
* the decoded information in the token
*/
  tokenBearer(req) {
    const token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, process.env.SECRET);
    return decoded;
  },
};

export default auth;
