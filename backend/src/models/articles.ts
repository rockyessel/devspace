import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema(
  {
    site_name: { type: String, unique: true },
    url: { type: String, required: [true, 'This field must be provided.'] },
    article_name: { type: String, unique: true },
    keywords: [{ type: String }],
    description: String,
    image: String,
    favicon: String,
    main_url: String,
    article_link:String,
    user_add_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export const Article = mongoose.model('Article', ArticleSchema);
