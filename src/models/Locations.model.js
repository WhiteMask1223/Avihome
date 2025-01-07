import mongoose from "mongoose";

const LocationSchema = mongoose.Schema({
    text: { type: String, trim: true, required: true }
}, { timestamps: true });

export default mongoose.models?.Location || mongoose.model('Location', LocationSchema);