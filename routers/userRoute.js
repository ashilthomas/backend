const express = require("express");
const { getData,userLogin } = require('../controller/userController');

const router = express.Router();

router.route("/users").post(getData);
router.route('/login').post(userLogin)

module.exports = router;
