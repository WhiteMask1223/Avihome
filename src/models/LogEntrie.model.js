import mongoose from "mongoose";

const LogEntrieSchema = mongoose.Schema({

    action: { type: String, trim: true, required: true },
    text: { type: String, trim: true, required: true },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, { timestamps: true });

export default mongoose.models?.LogEntrie || mongoose.model('LogEntrie', LogEntrieSchema);