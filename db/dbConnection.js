import mongoose from "mongoose";
import dotenv from 'dotenv';


dotenv.config();


export const dbConnection = mongoose.connect("mongodb+srv://concept12:ABC6453abc@cluster0.g0ytlmy.mongodb.net/")
.then(() => console.log("DB Connected")).catch((err) => console.log(err));


