import express from "express";

const router = express.Router();
const multer = require('multer');
const uploadController = require('../controllers/upload.controller');

const storage = multer.diskStorage({})
let upload = multer({storage});

/*Upload*/
router.post("/upload", upload.single("myFile"), uploadController.uploadPost);

/*Download link*/
router.get("/:id", uploadController.downloadLink)

/*Download file*/
router.get("/:id/download", uploadController.downloadFile)

module.exports = router;

