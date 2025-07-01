const {createPaymentSchema} = require('../Validations/payments.validation');
const { createPayment, getPayments, getPaymentsByVendorId, getPayment, deletePayment } = require('../Controllers/payments.controller');
const { validate } = require('../../../middlewares/validation');
const verifyTokenMiddleware = require('../../../middlewares/authenticate');
const express = require('express');

const router = express.Router();

router.post(
    '/payments',
    verifyTokenMiddleware,
    validate(createPaymentSchema),
    createPayment
);
router.get('/payments', verifyTokenMiddleware, getPayments);
router.get('/payments/vendor/:vendorId', verifyTokenMiddleware, getPaymentsByVendorId);
router.get('/payments/:id', verifyTokenMiddleware, getPayment);
router.delete('/payments/:id', verifyTokenMiddleware, deletePayment);

module.exports = router;