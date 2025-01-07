import mongoose from "mongoose";

const TypeSchema = mongoose.Schema({
    text: { type: String, trim: true, required: true },
    onlyOneRoom: {type: Boolean, default: false}
}, { timestamps: true });

export default mongoose.models?.Type || mongoose.model('Type', TypeSchema);