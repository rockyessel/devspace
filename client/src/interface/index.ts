import React from 'react';

export interface LayoutRootProps {
  children: React.ReactNode;
}

export interface Package {
  _id: string;
  metaData: MetaData;
  addedByUserId: string;
  main_owners: string[];
  articles: Article[];
  threads: Threads[];
  projects: [];
  announcements: [];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface MetaData {
  packageName: string;
  keywords: string[];
  license: { type: string; url: string };
  version: string;
  description: string;
  totalDownloads: string;
  links: { name: string; URL: string }[];
  owners: { name: string; profile: string; user_url: string }[];
  timeUploaded: string;
  language: string;
}

export interface User {
  _id: string;
  id: string;
  name: string;
  username: string;
  email: string;
  image: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Threads {
  related_to: string;
  title: string;
  description: string;
  created_by: string;
  status: boolean;
  type: string;
  keywords: string;
  image: string;
  mode: string;
  blacklist: [];
  participants: [];
  likes: [];
  views: [];
  createdAt: Date;
  updatedAt: Date;
}

export interface Article {
  site_name: string;
  url: string;
  articleName: string;
  keywords: string[];
  description: string;
  image: string;
  favicon: string;
  mainUrl: string;
  articleLink: string;
  addByUserId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Broadcast {
  room_id: string;
  owner: string;
  code: string;
  title: string;
  description: string;
  language: string;
  frameworks: string;
  packages: string;
  keywords: string;
  thumbnail: string;
  schedule: string;
  mode: string;
  allowedUserId: string[];
  participants: string[];
  chat: { userId: string; message: string; timestamp: Date }[];
  createdAt: Date;
  updatedAt: Date;
}
