const {returnFromService} = require("../../../utils/responses");
const {createPaymentQuery, getPaymentsQuery, getPaymentsByVendorIdQuery, getPaymentQuery, deletePaymentQuery} = require("../Queries/payments.query");
const PaymentError = require("../../../utils/Errors/PaymentError");


const createPaymentService = async (req, res, next) => {
  try {
    const paymentData = req.body;
    paymentData.userId = req.user.id;
    const payment = await createPaymentQuery(paymentData);
    return returnFromService(200)(true)()("Payment created successfully")(payment);
  } catch (error) {
    throw error;
  }
};

const getPaymentsService = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const payments = await getPaymentsQuery(userId);
    return returnFromService(200)(true)()("Payments retrieved successfully")(payments);
  } catch (error) {
    throw error;
  }
};

const getPaymentsByVendorIdService = async (req, res, next) => {
  try {
    const vendorId = req.params.vendorId;
    if (!vendorId || vendorId.trim() === "") {
      throw new PaymentError("Vendor ID is required", 400);
    }
    const payments = await getPaymentsByVendorIdQuery(vendorId);
    return returnFromService(200)(true)()("Payments retrieved successfully")(payments);
  } catch (error) {
    throw error;
  }
};
const getPaymentService = async (req, res, next) => {
  try {
    const paymentId = req.params.id;
    if (!paymentId || paymentId.trim() === "") {
      throw new PaymentError("Payment ID is required", 400);
    }
    const payment = await getPaymentQuery(paymentId);
    return returnFromService(200)(true)()("Payment retrieved successfully")(payment);
  } catch (error) {
    throw error;
  }
};

const deletePaymentService = async (req, res, next) => {
  try {
    const paymentId = req.params.id;
    if (!paymentId || paymentId.trim() === "") {
      throw new PaymentError("Payment ID is required", 400);
    }
    const payment = await deletePaymentQuery(paymentId);
    return returnFromService(200)(true)()("Payment deleted successfully")(payment);
  } catch (error) {
    throw error;
  }
};

module.exports = {
    
  createPaymentService,
  getPaymentsService,
  getPaymentsByVendorIdService,
  getPaymentService,
  deletePaymentService
};
