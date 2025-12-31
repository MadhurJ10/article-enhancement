import articleService from "../services/article.service.js";
import { AppError } from "../utils/errors.js"


class articleController {
    constructor() {
        this.articleService = new articleService();
    }
    improve = async (req, res, next) => {
        try {
            const { id } = req.body;

            const improve = await this.articleService.improveArticle(id);

            return res.json({
                msg: "worked",
                improve
            })
        } catch (error) {

        }

    }

    createArticle = async (req, res, next) => {
        try {
            const article = await this.articleService.createArticle(req.body);

            return res.status(201).json({
                success: true,
                article
            });
        } catch (error) {
            next(error);
        }
    };

}

export default new articleController()