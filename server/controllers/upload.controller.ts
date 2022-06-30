import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import {Request, Response} from "express";
import File from "../models/file";

import https from "https"

module.exports.uploadPost = async (req: Request, res: Response)=> {
    try {
        if(!req.file)
            return res.status(400).json({ message: "We need your file!"})
        console.log(req.file);
        let uploadedFile:UploadApiResponse;
        try {
            uploadedFile = await cloudinary.uploader.upload(req.file.path,{
                folder: "shareme",
                resource_type:"auto"
            })
        } catch(err) {
            console.log(err);
            return res.status(400).json({ message: "Cloudinary error!"})
        }

        const { originalname } = req.file;
        const { secure_url, bytes, format } = uploadedFile;

        const file = await File.create({
            filename: originalname,
            sizeInBytes: bytes,
            secure_url,
            format,
        });

        res.status(200).json({
            id: file.id,
            downloadPageLink:`${process.env.API_ENDPOINT_CLIENT}download/${file._id}`
        });

    } catch(err) {
        console.log(err);
        res.status(500).json({message: "Server error post"});
    }
};


module.exports.downloadLink = async (req:Request, res:Response)=> {
    try {
        const id = req.params.id
        const file = await File.findById(id)
        if(!file) {
            return res.status(404).json({message: "File does not exist"})
        }

        const { filename, format, sizeInBytes } = file;
        return res.status(200).json(
            {
            name: filename,
            sizeInBytes,
            format,
            id,
        })

    } catch(err) {
        return res.status(500).json({message: "Server Error get"});
    }
}

module.exports.downloadFile = async (req:Request, res:Response)=> {
    try {
        const id = req.params.id
        const file = await File.findById(id)
        if(!file) {
            return res.status(404).json({message: "File doesn't exist"})
        }

        https.get(file.secure_url, (fileStream)=> fileStream.pipe(res));

    } catch(err) {
        return res.status(500).json({message: "Server Error file"})
    }
}