import articleModel from "../../models/article.model.js";
import { AppError } from "../../utils/errors.js";
import IArticleRepo from "../contracts/IArticleRepo.js";


class MongoArticleRepo extends IArticleRepo {
    async createArticle(data) {
        try {
            return await articleModel.create(data); // 👈 directly pass data
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    }

    async getAllArticle() {
        try {
            return await articleModel.find();
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    }

    async getArticle(id) {
        try {
            console.log(id);
            console.log("from mogo")
            return articleModel.findById(id);
        } catch (error) {
            throw new AppError(error.message, 500);
        }
    }

    async deleteArticle(id) {
        try {
            return await articleModel.findByIdAndDelete(id);
        } catch (error) {
            throw new AppError(error.message, 500);
        }

    }

    async updateArticle(id, update) {
        try {
            return await articleModel.findByIdAndUpdate(
                id,
                update,
                { new: true, runValidators: true }
            );
        } catch (error) {
            throw new AppError("Failed to update article", 500);
        }
    }
}

export default MongoArticleRepo;