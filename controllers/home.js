
import home from "../models/home.js";
import Home from "../models/home.js";
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
  } catch (error) {
    console.log(error)
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
export const getCurrentUserPosts = async(req,res) => {

  try {
    if(req.userId){
      const userPosts = await home.find({ creator:req.userId})
      res.status(200).json(userPosts)
    }else{
      res.status(400).json({message:'invalid credential'})
    }
  } catch (error) {
    console.log(error.message)
    res.status(404).json({message:error.message})
  }
}