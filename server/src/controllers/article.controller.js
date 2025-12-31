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

    getAllArticle = async (req, res, next) => {
        try {
            const all = await this.articleService.getAllArticle();

            return res.status(201).json({
                success: true,
                data: all
            });
        } catch (error) {
            next(error)
        }

    }

    getArticle = async (req, res, next) => {
        try {
            const { id } = req.body;
            const article = await this.articleService.getArticle(id);
            return res.status(201).json({
                success: true,
                data: article
            });
        } catch (error) {
            next(error);
        }

    }

    deleteArticle = async (req, res, next) => {
        try {
            const { id } = req.body
            const del = await this.articleService.deleteArticle(id);
            return res.status(201).json({
                success: true,
                msg: "delete pass"
            });
        } catch (error) {
            next(error)
        }
    }

}

export default new articleController()