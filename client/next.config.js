/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'flowbite.com',
      'crates.io',
      'images.unsplash.com',
      'avatars.githubusercontent.com',
      'avatars2.githubusercontent.com',
      'avatars1.githubusercontent.com',
    ],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
