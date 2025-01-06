import mongoose from "mongoose";

const LocationSchema = mongoose.Schema({
    location: { type: String, trim: true, required: true }
});

export default mongoose.models?.Location || mongoose.model('Location', LocationSchema);