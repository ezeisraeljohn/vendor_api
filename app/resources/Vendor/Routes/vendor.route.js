const verifyTokenMiddleware = require('../../../middlewares/authenticate');
const { updateVendor,getVendors, getVendor, deleteVendor } = require('../Controllers/vendor.controller');
const express = require('express');
const {updateVendorSchema} = require('../Validations/vendor.validation');
const { validate } = require('../../../middlewares/validation');

const router = express.Router();

// Routers for 
router.get('/vendors', verifyTokenMiddleware, getVendors);

// Routers for specifics
router.put('/vendors/:id', verifyTokenMiddleware, validate(updateVendorSchema), updateVendor);
router.get('/vendors/:id', verifyTokenMiddleware, getVendor);
router.delete('/vendors/:id', verifyTokenMiddleware, deleteVendor);


module.exports = router;