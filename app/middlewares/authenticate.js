const { decodeToken } = require("../utils/helpers");
const {AuthenticationError} = require("../utils/Errors/authenticationError");
const {getUserByIdQuery} = require("../resources/Authentication/Queries/authentication.query");

/** * Middleware to verify JWT token and authenticate user
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 * @returns {void} - Calls next middleware or returns an error response
 */
const verifyTokenMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            throw new AuthenticationError("No token provided", 401);
        }
        const decoded = decodeToken(token);
        if (!decoded.type) {
            throw new AuthenticationError("Invalid token", 401);
        }
        user = await getUserByIdQuery(decoded.data.id);
        if (!user) {
            throw new AuthenticationError("Invalid user", 404);
        }
        req.user = user;
        next();
    } catch (error) {
        next(new AuthenticationError("Invalid token", 401));
    }
};

module.exports = verifyTokenMiddleware;