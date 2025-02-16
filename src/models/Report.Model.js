import mongoose from "mongoose";

const ReportSchema = mongoose.Schema({
    offertId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offert',
        required: true
    },

    reportedUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    text: { type: String, trim: true, required: true },
    
}, { timestamps: true });

export default mongoose.models?.Report || mongoose.model('Report', ReportSchema);