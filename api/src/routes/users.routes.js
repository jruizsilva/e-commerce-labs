const { Router } = require("express");
const {
  googleAuth,
  getUser,
  signInUser,
  signUpUser,
  getPublicationsByUserId,
  putPublicationById,
  getMyPurchases,
} = require("../controllers/users.controller.js");
const router = Router();
router.post("/signup", signUpUser);
router.post("/signin", signInUser);
router.post("/googleAuth", googleAuth);
router.post("/user", getUser);
router.get("/:userId/publications", getPublicationsByUserId);
router.put("/:userId/publication/:publicationId", putPublicationById);
router.get("/:userId/my-purchases", getMyPurchases);

module.exports = router;
