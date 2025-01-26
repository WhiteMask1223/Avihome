import mongoose from "mongoose";

const LogEntrieSchema = mongoose.Schema({

    action: { type: String, trim: true },
    text: { type: String, trim: true },

    user: {
        _id: { type: String, trim: true },
        name: { type: String, trim: true }
    }

}, { timestamps: true });

export default mongoose.models?.LogEntrie || mongoose.model('LogEntrie', LogEntrieSchema);