import Car from "../models/Car.js"
import User from "../models/User.js"

export const uploadAvatar = async (req, res) => {
    const url = `/uploads/avatars/${req.file.filename}`
    await User.updateOne({
        _id: req.userId
    }, {
        avatar: url
    })
    res.json({
        url: url
    })
}


export const uploadCar = async (req, res) => {
    const url = `/uploads/cars/${req.file.filename}`
    await Car.updateOne({
        driver: req.userId
    }, {
        img: url
    })
    res.json({
        url: url
    })
}

export const uploadOrderImg = async (req, res) => {
    const url = `/uploads/orders/${req.file.filename}`
    res.json({
        url: url
    })
}