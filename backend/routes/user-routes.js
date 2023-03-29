const express = require("express");
const { check } = require("express-validator");

const router = express.Router();
const usersController = require("../controllers/user-controller");

router.get("/");

router.post(
  "/signup",
  [
    check("userName").not().isEmpty(),
    check("email")
      .normalizeEmail() // Test@test.com => test@test.com
      .isEmail(),
    check("password").isLength({ min: 6 }),
    check("phoneNumber").notEmpty().isLength({min:10}),
  ],
  usersController.signup
);

router.post("/login", usersController.login);

module.exports = router;
