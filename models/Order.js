import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    datetime: {
        type: String,
        required: true
    },
    carBody: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'Тапсырыс бос'
    },
    img: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

export default mongoose.model('Order', schema)