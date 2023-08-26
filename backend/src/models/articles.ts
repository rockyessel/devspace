import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema(
  {
    siteName: { type: String, unique: true },
    url: { type: String, required: [true, 'This field must be provided.'] },
    articleName: { type: String, unique: true },
    keywords: [{ type: String }],
    description: String,
    image: String,
    favicon: String,
    mainUrl: String,
    articleLink: String,
    addedByUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export const Article = mongoose.model('Article', ArticleSchema);
