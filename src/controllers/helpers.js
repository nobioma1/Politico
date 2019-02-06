import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const helpers = {
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  },

  compareHashPassword(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
  },

  generateToken(id, admin) {
    const token = jwt.sign({ userId: id, isAdmin: admin }, process.env.SECRET, { expiresIn: '24h' });
    return token;
  },
};

export default helpers;
