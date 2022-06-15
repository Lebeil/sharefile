import {Request, Response} from "express";

const router = require('express').Router();
const multer = require('multer');

const storage = multer.diskStorage({})

let upload = multer({
    storage
});

router.post("/upload", upload.single("myFile"), (req: Request, res: Response)=> {
    try {
        if(!req.file)
            return res.status(400).json({ message: "We need your file!"})
        console.log(req.file);
    } catch(err) {
        console.log(err);
        res.status(500).json({message: "Server error"});
    }
});

module.exports = router;

