import mongoose from "mongoose"



const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    sourceUrl: {
      type: String,
      required: false
    },

    originalContent: {
      type: String,
      required: true
    },

    improvedContent: {
      type: String,
      default: null
    },

    references: {
      type: [String],
      default: []
    },

    isImproved: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);



const articleModel = mongoose.model('article' , articleSchema)

export default articleModel;