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
      const query = 'SELECT * FROM users WHERE id = $1 AND email = $2';
      const { rows } = await db.query(query, [decoded.userId, decoded.userEmail]);
      if (!rows[0]) {
        return res.status(400).send({
          status: 400,
          error: 'Invalid Token',
        });
      }
      // passing a new variable on request we use to authorize user
      req.user = { id: decoded.userId, email: decoded.userEmail, isAdmin: decoded.isAdminStatus };
      next();
    } catch (error) {
      return res.status(400).send({
        status: 400,
        error: 'Server Error, Please Try Again',
      });
    }
  },
};

export default auth;
