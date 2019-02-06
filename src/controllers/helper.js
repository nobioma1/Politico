import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const helper = {
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  },

  compareHashPassword(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
  },

  generateToken(id) {
    const token = jwt.sign({ userId: id }, process.env.SECRET);
    return token;
  },
};

export default helper;
