const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const {ensureAutentication} = require("../middlewares/ensureAuthenticated");

router.post("/:id", ensureAutentication, commentController.store);

module.exports = router;
