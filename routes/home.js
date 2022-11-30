import express from "express";
import { createHome, getAllposts } from "../controllers/home.js";
import auth from '../middleware/auth.js'
const router = express.Router();


router.post('/create', auth,createHome)
router.get('/getHomes',getAllposts)

export default router