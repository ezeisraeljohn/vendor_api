const {returnFromService} = require("../../../utils/responses");
const {updateVendorQuery, getVendorsQuery, getVendorQuery, deleteVendorQuery} = require("../Queries/vendor.query");
const VendorError = require("../../../utils/Errors/vendorError");
const logger = require("../../../utils/logger");

const updateVendorService = async (req, res, next) => {
    try {
       
        const vendorData = req.body;
        const vendorId = req.params.id;

        if (!vendorId || vendorId.trim() === "") {
            throw new VendorError("Vendor ID is required", 400);
        }
        // Update vendor information
        const updatedVendor = await updateVendorQuery({ id: vendorId, data: vendorData });
        console.log("Updated Vendor:", updatedVendor);
        
        if (!updatedVendor.success) {
            throw new VendorError(updatedVendor.message, 400);
        }
        const { password: _, ...vendorDataWithoutPassword } = updatedVendor.data.toJSON();
        updatedVendor.data = vendorDataWithoutPassword;
        return returnFromService(200)(true)()("Vendor updated successfully")(updatedVendor.data);
    } catch (error) {
        throw error;
    }
};

const getVendorsService = async (req, res, next) => {
    try {
        const vendors = await getVendorsQuery(req.params.id);
        if (!vendors.success) {
            logger.error(`Error retrieving vendors: ${vendors.message}`, {
                stack: vendors.stack,
                origin: "getVendorsService",
                field: "getVendors"
            });
            throw new VendorError(vendors.message, 400);
        }
        return returnFromService(200)(true)()("Vendors retrieved successfully")(vendors.data);
    } catch (error) {
        throw error;
    }
}

const getVendorService = async (req, res, next) => {
    try {
        const vendorId = req.params.id;
        if (!vendorId || vendorId.trim() === "") {
            throw new VendorError("Vendor ID is required", 400);
        }
        const vendor = await getVendorQuery(vendorId);
        if (!vendor.success) {
            throw new VendorError(vendor.message, 400);
        }
        return returnFromService(200)(true)()("Vendor retrieved successfully")(vendor.data);
    } catch (error) {
        throw error;
    }
}

const deleteVendorService = async (req, res, next) => {
    try {
        const vendorId = req.params.id;
        if (!vendorId || vendorId.trim() === "") {
            throw new VendorError("Vendor ID is required", 400);
        }
        const deletedVendor = await deleteVendorQuery(vendorId);
        if (!deletedVendor.success) {
            throw new VendorError(deletedVendor.message, 400);
        }
        return returnFromService(200)(true)()("Vendor deleted successfully")(deletedVendor.data);
    } catch (error) {
        throw error;
    }
};



module.exports = {
    updateVendorService,
    getVendorsService,
    getVendorService,
    deleteVendorService
};