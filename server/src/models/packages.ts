import mongoose from 'mongoose';

const PackageSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true, unique: true },
    metaData: {
      package_name: { type: String, unique: true },
      body: { type: String, required: false },
      keywords: [{ type: String }],
      license: { type: { type: String }, url: { type: String } },
      version: String,
      description: String,
      total_downloads: String,
      links: [{ name: String, URL: String }],
      owners: [{ name: String, profile: String, user_url: String }],
      time_uploaded: String,
      addedBy_userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      main_owners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
    articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId.cast, ref: 'User' }],
    threads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Threads' }],
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    announcements: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Announcement' },
    ],
    analytics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Analytics' }],
  },
  { timestamps: true }
);

export const Package = mongoose.model('Package', PackageSchema);
