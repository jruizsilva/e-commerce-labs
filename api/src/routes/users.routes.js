const { Router } = require("express");
const {
  googleAuth,
  getUser,
  signInUser,
  signUpUser,
  getPublicationsByUserId,
  putPublicationById,
  getMyPurchases,
  addReview,
  updateUser
} = require("../controllers/users.controller.js");
const router = Router();
router.post("/signup", signUpUser);
router.post("/signin", signInUser);
router.post("/googleAuth", googleAuth);
router.post("/user", getUser);
router.get("/:userId/publications", getPublicationsByUserId);
router.put("/:userId/publication/:publicationId", putPublicationById);
router.get("/:userId/my-purchases", getMyPurchases);
router.put("/:userId/review/:productId", addReview)
router.put("/:userId/update", updateUser)

module.exports = router;
