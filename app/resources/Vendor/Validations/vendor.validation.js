const yup = require("yup");

const updateVendorSchema = yup.object().shape({
    firstName: yup.string().trim().min(2).max(50).notRequired(),
    lastName: yup.string().trim().min(2).max(50).notRequired(),
    address: yup.string().trim().min(10).max(255).notRequired(),
})


module.exports = { updateVendorSchema };