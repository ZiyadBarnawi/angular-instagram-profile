import { Post } from './post.model';

export interface User {
  username: string;
  password: string;
  email?: string;
  phoneNumber?: string;
  gender?: string;
  dateOfBirth?: string;
  bio?: string;
  pfpUrl: string;
  followers?: number;
  following?: number;
  posts?: Post[];
  stories?: string[];
  hasActiveStory?: boolean;
  created_at?: Date;
}
