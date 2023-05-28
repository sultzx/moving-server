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
    status: {
        type: String,
        required: true,
        default: 'Тапсырыс бос'
    },
    clientPrice: {
        type: Number,
        default: 350
    },
    driverPrice: {
        type: Number,
        default: 0
    },
    img: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
    }
}, {
    timestamps: true
})

export default mongoose.model('Order', schema)