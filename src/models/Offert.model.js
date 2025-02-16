import mongoose from "mongoose";

const OffertSchema = mongoose.Schema({

    images: [
        {
            name: { type: String, required: true },
            public_id: { type: String, required: true },
            url: { type: String, required: true },
        },
    ],

    localImages: [ String ],

    title: { type: String, trim: true, required: true },
    type: { type: String, trim: true, required: true },

    location: { type: String, trim: false, required: true },
    address: { type: String, trim: false, required: true },

    description: { type: String, trim: false, required: true},

    services:{
        "Agua": { type: Boolean, default: false, required: true },
        "Aire Acondicionado": { type: Boolean, default: false, required: true },
        "Electricidad": { type: Boolean, default: false, required: true },
        "Gas": { type: Boolean, default: false, required: true },
        "Internet": { type: Boolean, default: false, required: true }
    },

    otherServices: { type: String, trim: false, required: true},

    availability: {
        capacity: { type: Number, min: 0, required: true },
        roomsAvailable: { type: Number, min: 0, required: true }
    },

    admits: {
        "Caballeros": { type: Boolean, default: false, required: true },
        "Damas": { type: Boolean, default: false, required: true },
        "Cualquiera": { type: Boolean, default: false, required: true }
    },

    rating: { type: Number, min: 0, max: 5, default: 0},

    hidden: { type: Boolean, default: false },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, { timestamps: true });

export default mongoose.models?.Offert || mongoose.model('Offert', OffertSchema);