const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");
const { makeUserAvailableInViews } = require("../middlewares/ensureAuthenticated");

router.get("/", makeUserAvailableInViews, pagesController.showHome);
router.get("/login", pagesController.showLogin);
router.get("/register", pagesController.showRegister);
router.post("/register", pagesController.register);
router.get("/logout", pagesController.logout);
module.exports = router;
