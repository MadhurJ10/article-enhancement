import express from 'express'
import articleController from '../controllers/article.controller.js';


const router = express.Router();

router.post("/create", articleController.createArticle)
router.get("/allarticle", articleController.getAllArticle)
router.get("/getarticle/:id", articleController.getArticle)
router.delete('/delete', articleController.deleteArticle)
router.post("/improve", articleController.improve)

export default router;