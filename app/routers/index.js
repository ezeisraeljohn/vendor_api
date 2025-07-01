const AuthenticationRouter = require("../resources/Authentication/Routes/authentication.route");
const VendorRouter = require("../resources/Vendor/Routes/vendor.route");
const PaymentRouter = require("../resources/Payments/Routes/payments.route"); 


// Mount the authentication routes
const router = (app) => {
    app.use("/api/v1/auth", AuthenticationRouter);
    app.use("/api/v1", VendorRouter);
    app.use("/api/v1", PaymentRouter);
}

module.exports = router;