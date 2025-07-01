const {User} = require("../../../models");
const {returnFromService} = require("../../../utils/responses");
const {getUserByEmailQuery, getUserByIdQuery, createUserQuery} = require("../Queries/authentication.query");
const {AuthenticationError} = require("../../../utils/Errors/authenticationError");
const logger = require("../../../utils/logger");
const {verifyPassword, generateToken} = require("../../../utils/helpers");


/** * Service to handle user signup
 * @param {Object} req - The request object containing user data
 * @param {Object} res - The response object to send the response
 * @param {Function} next - The next middleware function
 * @returns {Promise<void>} - Returns a response with the created user data or an error
 */
const signupService = async (req, res, next) => {

    try {
        const {email} = req.body;
        const existingUser = await getUserByEmailQuery(email)
        if (existingUser) {
            throw new AuthenticationError("User already exists", 409);
        }
        const newUser = await createUserQuery(req.body);
        const {password: password1, ...newUserData} = newUser.toJSON();
        return returnFromService(201)(true)()("User created successfully")(newUserData);
    } catch (error) {
        logger.error(`Error in signupService: ${error.message}`, {
            stack: error.stack,
            origin: "signupService",
            field: "signup"
        });
        throw error;

    }
}

const loginService = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await getUserByEmailQuery(email);
        if (!user) {
            throw new AuthenticationError("Invalid Credentials", 401);
        }
        const isPasswordValid = verifyPassword(password, user.password);
        if (!isPasswordValid) {
            throw new AuthenticationError("Invalid Credentials", 401);
        }
        const token = await generateToken({ id: user.id }, true);
        return returnFromService(200)(true)()("Login successful")({token: token.data});
    } catch (error) {
        logger.error(`Error in loginService: ${error.message}`, {
            stack: error.stack,
            origin: "loginService",
            field: "login"
        });
        throw error;
    }
}


module.exports = {
    signupService,
    loginService
}