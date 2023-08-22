import mongoose from 'mongoose';

const PackageSchema = new mongoose.Schema(
  {
    metaData: {
      package_name: { type: String, unique: true },
      keywords: [{ type: String }],
      license: { type: { type: String }, url: { type: String } },
      version: String,
      description: String,
      total_downloads: String,
      links: [{ name: String, URL: String }],
      owners: [{ name: String, profile: String, user_url: String }],
      time_uploaded: String,
      language: String,
    },
    // body: { type: String, required: false },
    addedBy_userId: { type: String, ref: 'User' },
    main_owners: [{ type: String, ref: 'User' }],
    articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
    threads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thread' }],
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    announcements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Announcement' }],
  },
  { timestamps: true }
);

export const Package = mongoose.model('Package', PackageSchema);
