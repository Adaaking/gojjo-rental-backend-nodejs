
import mongoose from "mongoose";
import home from "../models/home.js";
import Home from "../models/home.js";
import user from "../models/user.js";
import cloudinary from "../utils/cluodinary.js";

export const createHome = async (req,res) => {
  let images = []
  try {
    for (let i=0; i<req.body.images.length;i++){
      const uploadedResponse = await cloudinary.uploader.upload(req.body.images[i],{
        upload_preset:"gojjo"
      });
      images.push(uploadedResponse)
    }
    const newHome = new Home({
      ...req.body,image:images, creator:req.userId,
    })
    const savedHome = await newHome.save()
    res.status(201).json({message:'home successfuly created',newHome:newHome})
  } catch (error) {
    res.status(500).json({message:'something went wrong'})
  }

}

export const getAllposts = async (req,res) => {
  try {
    const allhomes = await Home.find()
    res.status(200).json(allhomes)
  } catch (error) {
    res.status(404).json({message:"no homes found"})
  }
}

export const getUserPosts = async(req,res) => {
  const {id} = req.params
  const userPosts = await home.find({creator:id})
  res.status(200).json(userPosts)
}
export const updateHome = async(req,res) => {
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message:`no home with id:${id}`})

  const updatedHome = await home.findByIdAndUpdate(id,req.body,{new:true})

  res.status(200).json({message:'home successfully updated',updatedHome:updatedHome})
}

export const findbyId = async (req,res) => {
  const { id } = req.params
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message:`no home with id:${id}`})
  const newhome = await home.findById(id)
  const owner = await user.findById(newhome.creator)
  res.status(200).json({owner,newhome})
}

export const deleteHome = async(req,res) => {
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message:`no home with id:${id}`})
  await home.findByIdAndDelete(id)
  res.status(200).json({id:id,message:'home successfully deleted'})
}

