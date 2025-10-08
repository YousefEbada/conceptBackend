import mongoose, { Schema } from "mongoose";


const projectSchema = new Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    image: {
        data: { type: Buffer, required: true },
        contentType: { type: String, required: true }
    },
    category: { type: String, required: true, trim: true },
}, { timestamps: true });

projectSchema.index({ title: 1 }, { unique: false });

export const ProjectModel = mongoose.models.Project || mongoose.model("Project", projectSchema);