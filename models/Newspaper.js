import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: String,
    img: String
}, {
    timestamps: true
})

export default mongoose.model('Newspaper', schema)