import mongoose from "mongoose";

const OffertSchema = mongoose.Schema({

    title: { type: String, trim: true, required: true },
    type: { type: String, trim: true, required: true },

    location: { type: String, trim: true, required: true },
    address: { type: String, trim: true, required: true },

    description: { type: String, trim: true, required: true},

    services:{
        agua: { type: Boolean, default: false, required: true },
        aireAcondicionado: { type: Boolean, default: false, required: true },
        electricidad: { type: Boolean, default: false, required: true },
        gas: { type: Boolean, default: false, required: true },
        intrnet: { type: Boolean, default: false, required: true }
    },

    otherServices: { type: String, trim: true, required: true},

    availability: {
        capacity: { type: Number, min: 0, required: true},
        roomsAvailable: { type: Number, min: 0, required: true}
    },

    admits: {
        onlyMen: { type: Boolean, default: false, required: true },
        onlyWoman: { type: Boolean, default: false, required: true },
        any: { type: Boolean, default: false, required: true }
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