import mongoose from "mongoose";

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
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
    role: {
        type: String,
        default: 'user'
    },
    company: String,
}, {
    timestamps: true
})

export default mongoose.model('User', schema)