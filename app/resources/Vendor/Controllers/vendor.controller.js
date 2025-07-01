const {updateVendorService, getVendorsService, getVendorService, deleteVendorService} = require("../Services/vendor.service");
const {response} = require("../../../utils/responses");


/**
 * @desc Update vendor information
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {Object} - JSON response with success status and updated vendor data
 * @throws {Error} - Throws an error if the update fails
 * @route PUT /vendors/:id  
 * @access Private
 */
const updateVendor = async (req, res, next) => {
    try {
        const updatedVendor = await updateVendorService(req, res, next);
        return response(updatedVendor)("Vendor")(res);
    } catch (error) {
        return next(error);
    }
};

/**
 * @desc Get all vendors
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {Object} - JSON response with success status and list of vendors
 * @throws {Error} - Throws an error if the retrieval fails
 * @route GET /vendors
 * @access Private
 */
const getVendors = async (req, res, next) => {
    try {
        const vendors = await getVendorsService(req, res, next);
        return response(vendors)("Vendors")(res);
    } catch (error) {
        return next(error);
    }
};
const getVendor = async (req, res, next) => {
    try {
        const vendor = await getVendorService(req, res, next);
        return response(vendor)("Vendor")(res);
    } catch (error) {
        return next(error);
    }   
}

const deleteVendor = async (req, res, next) => {
    try {
        const deletedVendor = await deleteVendorService(req, res, next);
        return response(deletedVendor)("Vendor")(res);
    } catch (error) {
        return next(error);
    }
}
module.exports = {updateVendor, getVendors, getVendor, deleteVendor};

