import mongoose from "mongoose";

const TypeSchema = mongoose.Schema({
    type: { type: String, trim: true, required: true },
    onlyOneRoom: {type: Boolean, default: false}
});

export default mongoose.models?.Type || mongoose.model('Type', TypeSchema);