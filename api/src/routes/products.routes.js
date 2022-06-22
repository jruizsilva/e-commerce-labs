const { Router } = require("express");
// importamos las funciones controladoras
const {
  getProducts,
  getProductsByName,
  getProductsById,
  createProducts,
  deleteProduct,
  updateProduct,
} = require("../controllers/products.controller.js");
const router = Router();
const fileUpload = require("express-fileupload");

router.get("/", getProducts); // funcion controladora de todos los productos
router.get("/search", getProductsByName);
router.get("/:productId", getProductsById);
router.post(
  "/create",
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  }),
  createProducts
);
router.delete("/delete/:id", deleteProduct);
router.put("/update/:id", updateProduct);

module.exports = router;
