interface Comment {
  id: number;
  username: string;
  text: string;
}

export interface Post {
  id: number;
  username: string;
  profileImage: string;
  postImage: string;
  caption: string;
  likes: number;
  comments: Comment[];
  isLiked: boolean;
}

export interface StoryType {
  image: string;
  time: number; // in seconds
  seen: boolean;
  id: string;
}

export interface StoryUserType {
  id: number;
  name: string;
  profile: string;
  stories: StoryType[];
}
