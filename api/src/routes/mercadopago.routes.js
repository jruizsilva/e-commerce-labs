const { Router } = require("express");
const router = Router();
const {
  addOrder,
  payment,
  cancelPayment,
} = require("../controllers/mercadopago.controller.js");

router.post("/", addOrder);
router.get("/payment", payment);
router.get("/failure", cancelPayment);

module.exports = router;
