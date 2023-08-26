import mongoose from 'mongoose';

const PackageSchema = new mongoose.Schema(
  {
    metaData: {
      packageName: { type: String, unique: true },
      keywords: [{ type: String }],
      license: { type: { type: String }, url: { type: String } },
      version: String,
      description: String,
      totalDownloads: String,
      links: [{ name: String, URL: String }],
      owners: [{ name: String, profile: String, user_url: String }],
      timeUploaded: String,
      language: String,
      installation: String,
      webURL: String,
      packageManager: { type: String, required: true },
    },
    // body: { type: String, required: false },
    claimedStatus: { type: String, required: false,default: 'Unclaimed' },
    addedByUserId: { type: String, ref: 'User' },
    main_owners: [{ type: String, ref: 'User' }],
    trackers: [{ type: String, ref: 'User' }],
    reliability: [{ type: String, ref: 'User' }],
    articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
    threads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thread' }],
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    announcements: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Announcement' },
    ],
  },
  { timestamps: true }
);

export const Package = mongoose.model('Package', PackageSchema);
