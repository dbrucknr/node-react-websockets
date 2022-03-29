const router = require("express").Router();
const {
  index,
  create,
  messages,
  deleteThread,
} = require("../controllers/threadController");
const { validate } = require("../validators");
const { auth } = require("../middleware/auth");

router.get("/", [auth], index);
router.get("/messages", [auth], messages);
router.post("/create", [auth], create);
router.delete("/:id", [auth], deleteThread);

module.exports = router;
