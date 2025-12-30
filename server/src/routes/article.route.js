import express from 'express'
import articleController from '../controllers/article.controller.js';


const router = express.Router();

router.post("/improve" , articleController.improve)

export default router;