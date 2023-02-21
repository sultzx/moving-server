
 import Newspaper from "../models/Newspaper.js";

 export const create = async (req, res) => {
    const {title, text, img} = req.body
    try {
        const document = new Newspaper({
            title,
            text, 
            img
        })

       const newspaper =  await document.save()

       res.status(200).json(newspaper)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
 }

 export const getAllNews = async (req, res) => {
    try {
       const newspaper =  await Newspaper.find()
       res.status(200).json(newspaper)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
 }