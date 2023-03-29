const express = require("express");
const multer = require('multer');
const mongoose = require("mongoose");

const musicController = require("../controllers/music-controller");
const Music = require("../models/music");

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,'./songs/')
    },

    filename: function(req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
  
  
const upload = multer({storage:storage});

// router.post("/",(req,res,next)=>{
//     console.log(req.file);
//     const music = new Music({
//         _id: new mongoose.Types.ObjectId(),
//         title: req.body.title,
//         artist: req.body.artist,
//         poster: req.body.poster,
//         // songpath: req.file.path,
//     });

//     music.save().then(result=>{
//         console.log(result);
//         res.status(201).json({ message: "Created songpath successfully",})
//     }).catch(err => {
//         console.log(err);
//         res.status(500).json({
//           error: err
//         });
//       });
// });

router.post("/",upload.single('songPath'),musicController.createMusic );
router.get("/", musicController.getMusics);
router.get("/:pid", musicController.getMusicById);

module.exports = router;