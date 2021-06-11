// Import dependencies
const app = require("express");
const router = app.Router();

// Controllers
const { createAccount, login } = require("../controllers/auth");

// @type POST
// @route /createAccount
// @desc creating new Account
// @access PUBLIC
router.post("/createAccount", createAccount);

router.post("/login", login);

module.exports = router;
