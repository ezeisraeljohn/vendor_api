const {User} = require('../../../models');

const updateVendorQuery = async (data) => {
    try {
        console.log("Updating vendor with data:", data);
        console.log("Vendor ID:", data.id);
        const [updatedRows, [updatedVendor]] = await User.update(data.data, {
        where: { id: data.id },
        returning: true,
        attributes: { exclude: ['password'] }
        });

    
        if (updatedRows === 0) {
        return { success: false, message: 'no changes made' };
        }
    
        return { success: true, data: updatedVendor };
    } catch (error) {
        return { success: false, message: "An Error Occured" };
    }
}

const getVendorsQuery = async () => {
    try {
        const vendors = await User.findAll({
            attributes: { exclude: ['password'] }
        });
        return { success: true, data: vendors };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

const getVendorQuery = async (id) => {
    try {
        const vendor = await User.findOne({
            where: { id },
            attributes: { exclude: ['password'] }
        });
        if (!vendor) {
            return { success: false, message: 'Vendor not found' };
        }
        return { success: true, data: vendor };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

const deleteVendorQuery = async (id) => {
    try {
        const vendor = await User.findOne({ where: { id } });
        if (!vendor) {
            return { success: false, message: 'Vendor not found' };
        }
        await vendor.destroy();
        return { success: true, message: 'Vendor deleted successfully' };
    } catch (error) {
        return { success: false, message: error.message };
    }
}
module.exports = {
    updateVendorQuery,
    getVendorsQuery,
    getVendorQuery,
    deleteVendorQuery
}