const {Payment} = require("../../../models");
const logger = require("../../../utils/logger");

const createPaymentQuery = async (paymentData) => {
  try {
    const payment = await Payment.create(paymentData);
    return payment;
  } catch (error) {
    logger.error("Error creating payment:", error);
    throw error;
  }
};

const getPaymentsQuery = async () => {
  try {
    const payments = await Payment.findAll();
    return payments;
  } catch (error) {
    logger.error("Error retrieving payments:", error);
    throw error;
  }
};

const getPaymentsByVendorIdQuery = async (vendorId) => {
  try {
    const payments = await Payment.findAll({
      where: { userId: vendorId },
    });
    return payments;
  } catch (error) {
    logger.error("Error retrieving payments by vendor ID:", error);
    throw error;
  }
};

const getPaymentQuery = async (paymentId) => {
  try {
    const payment = await Payment.findByPk(paymentId);
    return payment;
  } catch (error) {
    logger.error("Error retrieving payment:", error);
    throw error;
  }
};

const deletePaymentQuery = async (paymentId) => {
  try {
    const payment = await Payment.destroy({ where: { id: paymentId } });
    return payment;
  } catch (error) {
    logger.error("Error deleting payment:", error);
    throw error;
  }
};
module.exports = {
  createPaymentQuery,
  getPaymentsQuery,
  getPaymentsByVendorIdQuery,
  getPaymentQuery,
  deletePaymentQuery
};
