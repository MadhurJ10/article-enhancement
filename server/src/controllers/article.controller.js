import articleService from "../services/article.service.js";
import {AppError } from  "../utils/errors.js"


class articleController{
    constructor (){
        this.articleService = new articleService();
    }
    improve = async (req ,res, next) => {
        try {
            const { id } = req.body;
            console.log("from controller")


            const article = await this.articleService.getArticle(id);
            console.log("after service hit")

            return res.json({
                msg:"workingdfds",
                article
            })
        } catch (error) {
            
        }
        
    }
}

export default new articleController()