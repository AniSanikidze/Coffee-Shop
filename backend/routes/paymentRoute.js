const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/paymentController");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");

router.route("/payment/process").post(verifyToken, processPayment);

router.route("/stripeapikey").get(verifyToken, sendStripeApiKey);

module.exports = router;