import mongoose from "mongoose";

const LogEntrieSchema = mongoose.Schema({

    action: {
        actionId: { type: String, trim: true, required: true},
        actionText: { type: String, trim: true },
    },
    
    item: {
        _id: { type: String, trim: true },
        type: { type: String, trim: true },
        name: { type: String, trim: true },
    },

    user: {
        _id: { type: String, trim: true },
        name: { type: String, trim: true }
    }

}, { timestamps: true });

export default mongoose.models?.LogEntrie || mongoose.model('LogEntrie', LogEntrieSchema);