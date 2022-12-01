import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesnt exist" });

    const ispasswordCorrect = await bcrypt.compare(password, existingUser.password);
    console.log(ispasswordCorrect)

    if (!ispasswordCorrect) 
    return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
        isAdmin: existingUser.isAdmin,
      },
      "addaatheking09096161434391918585",
      { expiresIn: "1h" }
    );
    res.status(200).json({ user: existingUser, token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "user already exist with email" });

    const salt = bcrypt.genSaltSync(12);

    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await User.create( { email,password:hashedPassword,name:`${firstName} ${lastName}`})
     const token = jwt.sign({ email: newUser.email,id: newUser._id,isAdmin: newUser.isAdmin,},"addaatheking09096161434391918585",{ expiresIn: "1h" });
     res.status(201).json({user:newUser, token:token})
  } catch (error) {
    res.status(500).json({message:"couldnt create user something went wrong"})
    console.log(error)
  }
};
