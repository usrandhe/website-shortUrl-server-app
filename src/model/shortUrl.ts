import mongoose from "mongoose";
import { nanoid } from "nanoid";

const shortUrlSchema = new mongoose.Schema({
    fullUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true,
        default: ()=> nanoid().substring(0,10)
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }

}, {
    timestamps: true
})

export const urlModal = mongoose.model('shortUrl', shortUrlSchema);