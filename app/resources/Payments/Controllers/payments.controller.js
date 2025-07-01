const {
    createPaymentService, 
    getPaymentsService, 
    getPaymentsByVendorIdService, 
    getPaymentService,
    deletePaymentService
    } = require('../Services/payments.service');
const {response} = require("../../../utils/responses");
/**
 * @desc Create a new payment
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {Object} - JSON response with success status and created payment data
 * @throws {Error} - Throws an error if the creation fails
 * @route POST /payments
 * @access Private
 */ 
const createPayment = async (req, res, next) => {
    try {
        const payment = await createPaymentService(req, res, next);
        return response(payment)("Payment")(res);
    } catch (error) {
        return next(error);
    }
};

/** * @desc Get all payments
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {Object} - JSON response with success status and list of payments
 * @throws {Error} - Throws an error if the retrieval fails
 * @route GET /payments
 * @access Private
 */
const getPayments = async (req, res, next) => {
    try {
        const payments = await getPaymentsService(req, res, next);
        return response(payments)("Payments")(res);
    } catch (error) {
        return next(error);
    }
};

/**
 * @desc Get payments by vendor ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {Object} - JSON response with success status and list of payments for the vendor
 * @throws {Error} - Throws an error if the retrieval fails or vendor ID is invalid
 * @route GET /payments/vendor/:vendorId
 * @access Private
 */
const getPaymentsByVendorId = async (req, res, next) => {
    try {
        const payments = await getPaymentsByVendorIdService(req, res, next);
        return response(payments)("Payments")(res);
    } catch (error) {
        return next(error);
    }
};

/**
 *  @desc Get a specific payment by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {Object} - JSON response with success status and payment data
 * @throws {Error} - Throws an error if the retrieval fails or payment ID is invalid
 * @route GET /payments/:id
 */
const getPayment = async (req, res, next) => {
    try {
        const payment = await getPaymentService(req, res, next);
        return response(payment)("Payment")(res);
    } catch (error) {
        return next(error);
    }
};
/**
 * @desc Delete a payment by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {Object} - JSON response with success status and deletion confirmation
 * @throws {Error} - Throws an error if the deletion fails or payment ID is invalid
 * @route DELETE /payments/:id
 */
const deletePayment = async (req, res, next) => {
    try {
        const payment = await deletePaymentService(req, res, next);
        return response(payment)("Payment")(res);
    } catch (error) {
        return next(error);
    }
};
module.exports = {
    createPayment,
    getPayments,
    getPaymentsByVendorId,
    getPayment,
    deletePayment
};