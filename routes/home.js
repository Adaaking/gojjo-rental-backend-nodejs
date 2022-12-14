import express from "express";
import { createHome, deleteHome, getAllposts,updateHome,findbyId,getUserPosts } from "../controllers/home.js";
import auth from '../middleware/auth.js'
const router = express.Router();


router.post('/create', auth,createHome)
router.get('/getHomes',getAllposts)
router.patch('/update/:id',updateHome)
router.get('/userposts/:id',getUserPosts)
router.delete('/delete/:id',deleteHome)
router.get('/findbyid/:id',findbyId)
export default router