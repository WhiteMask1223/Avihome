import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: { type: String, trim: true, required: true },
    email: { type: String, trim: true, required: true, unique: true },
    contEmail: { type: String, trim: true },
    password: { type: String, required: true, default: "password"},
    phone: { type: String, trim: true, required: true },
    contactWay: {
        call: {type: Boolean, default: false},
        whatsapp: {type: Boolean, default: false},
        telegram: {type: Boolean, default: false},
    },
    role: { type: String, required: true, default: "User"},
    active: {type: Boolean, default: false},
});

export default mongoose.models?.User || mongoose.model('User', UserSchema);