import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
    offertId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offert',
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    message: { type: String, trim: true, required: true },

    stars: { type: Number, min: 0, required: true }
    
}, { timestamps: true });

export default mongoose.models?.Comment || mongoose.model('Comment', CommentSchema);