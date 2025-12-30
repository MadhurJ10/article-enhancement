import mongoose from "mongoose"

const articleSchema = new mongoose.Schema({
    title: String,
})

const articleModel = mongoose.model('article' , articleSchema)

export default articleModel;