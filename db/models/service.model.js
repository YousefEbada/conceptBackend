import mongoose, { Schema } from "mongoose";


const serviceSchema = new Schema({
    id: "string",          // unique id
    title: "string",       // translated service title
    excerpt: "string",     // short description
    image: "string",       // path or URL to image
    description: "string", 
});

const ServiceModel = mongoose.model("Service", serviceSchema);