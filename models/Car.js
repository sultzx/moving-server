import mongoose from "mongoose";

const schema = new mongoose.Schema({
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    brand: String,
    model: String,
    number: String,
    color: String,
    body: String,
    
    rating: [{
        type: Number,
        default: 0
    }],

    img: String,
}, {
    timestamps: true
})

export default mongoose.model('Car', schema)
