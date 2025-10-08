import mongoose, { Schema } from "mongoose";


const serviceSchema = new Schema({
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, required: true, trim: true, maxlength: 300 },
    image: {
        data: { type: Buffer, required: true },
        contentType: { type: String, required: true }
    },
    description: { type: String, required: true },
}, { timestamps: true });

serviceSchema.index({ title: 1 }, { unique: false });

export const ServiceModel = mongoose.models.Service || mongoose.model("Service", serviceSchema);