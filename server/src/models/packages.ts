import mongoose from 'mongoose';

const PackageSchema = new mongoose.Schema(
  {
    package_name: { type: String, unique: true },
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
  { timestamps: true }
);

export const Package = mongoose.model('Package', PackageSchema);

