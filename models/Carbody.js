import mongoose from "mongoose"

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    weight: String,
    size: String,
    price: String,
    img: String
})

export default mongoose.model('Carbody', schema)