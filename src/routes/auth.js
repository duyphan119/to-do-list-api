const authController = require("../controllers/authController");

const router = require("express").Router();

router.post("/sign-up", authController.signUp);
router.post("/sign-in", authController.signIn);
router.post("/refresh", authController.refreshToken);
router.post("/sign-out", authController.signOut);

module.exports = router;
