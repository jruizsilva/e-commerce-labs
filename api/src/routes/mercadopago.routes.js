const { Router } = require("express");
const router = Router();
const {
  addOrder,
  payment,
} = require("../controllers/mercadopago.controller.js");

router.get("/", (req, res) => {
  res.send("mercado pago");
});
router.post("/", addOrder);
router.get("/payment", payment);
module.exports = router;
