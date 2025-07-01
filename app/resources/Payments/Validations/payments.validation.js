const yup = require("yup");

const createPaymentSchema = yup.object().shape({
  amount: yup
    .number()
    .required("Amount is required")
    .positive("Amount must be a positive number"),

   currency: yup
    .string()
    .required("Currency is required")
    .matches(/^[A-Z]{3}$/, "Currency must be a valid 3-letter code"),
   description: yup.string().trim().max(255, "Description must be at most 255 characters").notRequired(),
   paidAt: yup.date().required("Payment date is required").nullable(),
});

module.exports = {
  createPaymentSchema,
};