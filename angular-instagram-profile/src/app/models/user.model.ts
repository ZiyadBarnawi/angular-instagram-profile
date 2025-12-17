import { Post } from './post.model';

export interface User {
  username: string;
  bio?: string;
  pfp_url: string;
  followers?: number;
  following?: number;
  posts?: Post[];
  stories?: string[];
  hasActiveStory?: boolean;
  created_at?: Date;
}
