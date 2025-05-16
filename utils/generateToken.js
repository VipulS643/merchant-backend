
import pkg from 'jsonwebtoken';
const { sign } = pkg;

const generateToken = (id, role) => {
  return sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export default generateToken;
