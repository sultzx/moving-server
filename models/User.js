import mongoose from "mongoose";

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    name: String,
    phone: String,
    address: String,
    avatar: String,
    role: String,
    company: String,
}, {
    timestamps: true
})

export default mongoose.model('User', schema)