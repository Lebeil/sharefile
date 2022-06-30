import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import {Request, Response} from "express";
import File from "../models/file";
const nodemailer = require("nodemailer");

import https from "https"
import createEmailTemplate from "../utils/createEmailTemplate";

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

/*Email*/
module.exports.emails = async(req:Request, res:Response)=> {
    // 1. Validate request
    const {id, emailFrom, emailTo} = req.body
    // 2. File exist ?
    const file = await File.findById(id)
    if(!file) {
        return res.status(404).json({message: "File doesn't exist"})
    }
    // 3. Create transporter
    let transporter = nodemailer.createTransport({
        host: process.env.SENDINBLUE_SMTP_HOST,
        port: process.env.SENDINBLUE_SMTP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SENDINBLUE_SMTP_USER,
            pass: process.env.SENDINBLUE_SMTP_PASSWORD,
        },
    });

    // 4. Email data
    const { filename, sizeInBytes } = file;
    const filesize = `${(Number(sizeInBytes) / (1024 * 1024)).toFixed(2)} MB`;
    const downloadPageLink = `${process.env.API_ENDPOINT_CLIENT}download/${id}`;

    const mailOptions = {
        from: emailFrom, // sender address
            to: emailTo, // list of receivers
        subject: "File shared ✔", // Subject line
        text: `${emailFrom} shared a file with you`, // plain text body
        html:createEmailTemplate(emailFrom,downloadPageLink,filename,filesize), // html body
    }

    // 5. Send mail using the transporter
    transporter.sendMail(mailOptions, async(error: any, info: any)=> {
        if(error) {
            console.log(error);
            return res.status(500).json({
                message: "server error !"
            });
        }

        file.sender = emailFrom;
        file.receiver = emailTo;

        await file.save();
        return res.status(200).json({
            message:"Email sent",
        })
    })


    // 6. Save the data and send the response
}
