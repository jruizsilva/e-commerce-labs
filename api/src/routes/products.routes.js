const { Router } = require("express");
// importamos las funciones controladoras
const {
  getProducts,
  getProductsByName,
  getProductsById,
  createProducts,
  deleteProduct,
  updateProduct,
  getReviewsByProductId,
} = require("../controllers/products.controller.js");
const router = Router();
const fileUpload = require("express-fileupload");

router.get("/", getProducts); // funcion controladora de todos los productos
router.get("/:userId", getProducts); // funcion controladora de todos los productos
// router.get("/search", getProductsByName);
router.get("/product/:productId", getProductsById);
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
router.get("/:productId/reviews", getReviewsByProductId);

module.exports = router;
