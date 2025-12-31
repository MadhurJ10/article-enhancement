import articleService from "../services/article.service.js";
import {AppError } from  "../utils/errors.js"


class articleController{
    constructor (){
        this.articleService = new articleService();
    }
    improve = async (req ,res, next) => {
        try {
            const { id } = req.body;

            const improve = await this.articleService.improveArticle(id);
            
            return res.json({
                msg:"worked",
                improve
            })
        } catch (error) {
            
        }
        
    }
}

export default new articleController()