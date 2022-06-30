import express from "express";

const router = express.Router();
const multer = require('multer');
const uploadController = require('../controllers/upload.controller');

const storage = multer.diskStorage({})
let upload = multer({storage});

router.post("/upload", upload.single("myFile"), uploadController.uploadPost);
router.get("/:id", uploadController.downloadLink)
router.get("/:id/download", uploadController.downloadFile)
router.post("/email", uploadController.emails)

module.exports = router;

