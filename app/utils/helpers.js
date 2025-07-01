const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { returnResult } = require("./responses");
const dotenv = require("dotenv");

dotenv.config();

/**
 * @description - Generate a JWT token for authentication
 * @param {Object} data
 * @param {Boolean} isToken
 * @returns The generated token
 */
const generateToken = async (data, isToken = true) => {
  try {
    const secret = isToken
      ? process.env.TOKEN_SECRET
      : process.env.REFRESH_TOKEN_SECRET;

    const expiry = isToken
      ? process.env.TOKEN_EXPIRY
      : process.env.REFRESH_TOKEN_EXPIRY;

    const token = await new Promise((resolve, reject) => {
      jwt.sign(
        data,
        secret,
        { algorithm: "HS256", expiresIn: expiry },
        (err, signature) => (err ? reject(err) : resolve(signature))
      );
    });

    return returnResult(true, token);
  } catch (error) {
    return returnResult(false, error);
  }
};

const decodeToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    return returnResult(true, decoded);
  } catch (error) {
    return returnResult(false);
  }
}

const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const verifyPassword = (password, hash) => bcrypt.compareSync(password, hash);

module.exports = {
  encryptPassword,
  verifyPassword,
  generateToken,
  decodeToken,
};