import mongoose from "mongoose"

const schema = new mongoose.Schema({
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
    },
    rating: {
        type: Number,
        default: 0
    },
    comment: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

export default mongoose.model('Comment', schema)