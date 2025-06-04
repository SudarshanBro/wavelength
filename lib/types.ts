export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Podcast {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  creatorId: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
  creator?: User;
  category?: Category;
  episodes?: Episode[];
}

export interface Episode {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  coverImage?: string;
  duration: number;
  podcastId: string;
  publishedAt: Date;
  scheduledFor?: Date;
  createdAt: Date;
  updatedAt: Date;
  podcast?: Podcast;
  comments?: Comment[];
  likes?: Like[];
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  slug: string;
}

export interface Comment {
  id: string;
  content: string;
  userId: string;
  episodeId: string;
  isPrivate: boolean;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  episode?: Episode;
}

export interface Like {
  id: string;
  userId: string;
  episodeId: string;
  createdAt: Date;
  user?: User;
  episode?: Episode;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface EpisodeTag {
  episodeId: string;
  tagId: string;
  episode?: Episode;
  tag?: Tag;
}