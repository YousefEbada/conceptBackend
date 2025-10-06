import mongoose, { Schema } from "mongoose";


const projectSchema = new Schema({
    id: "string",        // unique identifier
    title: "string",     // project title (localized with t)
    description: "string", // detailed description
    image: "string",     // image path or URL
    category: "string",
});

export const ProjectModel = mongoose.model("Project", projectSchema);