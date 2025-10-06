import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    id: "string",
    name: "string",
    email: "string",
    password: "string",
    role: {
        type: "string",
        enum: ["manager", "admin", "user"],
        default: "user",
    },
});

export const UserModel = mongoose.model("User", userSchema);