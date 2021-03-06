import mongoose from "mongoose"; // put { Document } if error

const Schema = mongoose.Schema;

const fileSchema = new Schema({
        filename: {
            type: String,
            required: true
        },
        secure_url: {
            type: String,
            required: true
        },
        format: {
            type: String,
            required: true
        },
        sizeInBytes: {
            type: String,
            required: true
        },
        sender: {
            type: String,
        },
        receiver: {
            type: String
        },
    },
    {
        timestamps: true,
    }
);

export interface IFile extends mongoose.Document {
    filename: string;
    secure_url: string;
    sizeInBytes: string;
    format: string;
    sender?: string;
    receiver?: string;
}

export default mongoose.model<IFile>("File", fileSchema);