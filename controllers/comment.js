import mongoose from "mongoose";
import Comment from "../models/Comment.js";

export const comment = async (req, res) => {
    try {
      const userId = req.userId
  
      const {car, rating, comment} = req.body
  
      const document = new Comment({
        car,
        rating,
        comment,
        creator: userId
      })
  
      await document.save()
  
      res.status(200).json()
  
    } catch (error) {
      res.status(500).json(error.message );
    }
  }
  
  export const getAllComments = async (req, res) => {
    try {
      
      const comments = await Comment.find().populate('car').populate('creator').exec()
  
      res.status(200).json(comments)
  
    } catch (error) {
      res.status(500).json({ message:  error.message });
    }
  }