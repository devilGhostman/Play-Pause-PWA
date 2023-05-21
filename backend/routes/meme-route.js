const express = require("express");
const mongoose = require("mongoose");

const memeController = require("../controllers/meme-controller")

const router = express.Router();

router.post("/",memeController.createMeme);
router.get("/",memeController.getMemes);

module.exports = router;

