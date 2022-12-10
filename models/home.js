import mongoose from "mongoose";

const homeSchema = mongoose.Schema({
  creator:{
    type:String
  },
  city: {
    type: String,
    required: true,
  },
  subcity: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  desc:{
    type:String,
    required:true
  },
  phoneNumber:{
    type:Number,
  },
  price: {
    type: Number,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  image: {
    type:[Object],
    required:true
  }
},
{
    timestamps:true
}
);

export default mongoose.model("Home",homeSchema)

