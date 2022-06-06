const { Router } = require("express");
const { getProducts, postProduct } = require("../controllers/products");

const router = Router();
router.get("/", getProducts); // /products
router.post("/", postProduct); // /products

module.exports = router;
