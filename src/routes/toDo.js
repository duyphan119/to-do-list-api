const toDoController = require("../controllers/toDoController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.get("/", verifyToken, toDoController.getAll);
router.get("/user/:userId", verifyToken, toDoController.getByUserId);
router.get("/:id", verifyToken, toDoController.getById);
router.post("/", verifyToken, toDoController.create);
router.put("/", verifyToken, toDoController.update);
router.delete("/:id", verifyToken, toDoController.delete);

module.exports = router;
