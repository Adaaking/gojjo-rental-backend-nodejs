import express from "express";
import { createHome, getAllposts, getCurrentUserPosts } from "../controllers/home.js";
import auth from '../middleware/auth.js'
const router = express.Router();


router.post('/create', auth,createHome)
router.get('/getHomes',getAllposts)
router.post('/userPosts',auth,getCurrentUserPosts)
export default router