import User from "../models/User.js"

export const uploadAvatar = async (req, res) => {
    const url = `/uploads/avatars/${req.file.originalname}`
    await User.updateOne({
        _id: req.userId
    }, {
        avatar: url
    })
    res.json({
        url: url
    })
}