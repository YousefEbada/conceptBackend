import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["manager", "admin", "user"],
        default: "user",
    },
}, { timestamps: true });

userSchema.index({ email: 1 }, { unique: true });

export const UserModel = mongoose.models.User || mongoose.model("User", userSchema);