const {User} = require("../../../models");
const logger = require("../../../utils/logger");
const {encryptPassword} = require("../../../utils/helpers");


const getUserByEmailQuery = async (email) => {
  try {
    const user = await User.findOne({
      where: { email },
    });
    return user;
  } catch (error) {
    throw new Error(`Error fetching user by email: ${error.message}`);
  }
};

const getUserByIdQuery = async (id) => {
  try {
    const user = await User.findOne({
      where: { id },
    });
    return user;
  } catch (error) {
    throw new Error(`Error fetching user by ID: ${error.message}`);
  }
};



const createUserQuery = async (userData) => {
  try {
    const {password, ...otherData} = userData;

    const hashedPassword = encryptPassword(password);
    const user = await User.create({...otherData, password: hashedPassword});
    return user;
  } catch (error) {
    logger.error(`Error creating user: ${error.message}`);
    throw new Error(`Error creating user: ${error.message}`);
  }
}

module.exports = {
  getUserByEmailQuery,
  getUserByIdQuery,
  createUserQuery,
};  