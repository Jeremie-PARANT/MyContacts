import mongoose from "mongoose";
const { Schema } = mongoose;
import User from "./User.js";

const contactSchema = new mongoose.Schema(
{
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
},
{ versionKey: false });

export default mongoose.model("Contact", contactSchema);