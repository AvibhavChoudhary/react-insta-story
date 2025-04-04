import React from "react";
import "../styles/Post.css";

interface PostProps {
  username: string;
  image: string;
  caption: string;
}

const Post: React.FC<PostProps> = ({ username, image, caption }) => (
  <div className="post">
    <div className="post-header">
      <img
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="avatar"
        className="avatar"
      />
      <span className="username">{username}</span>
    </div>
    <img src={image} alt="post" className="post-image" />
    <div className="post-caption">
      <strong>{username}</strong> {caption}
    </div>
  </div>
);

export default Post;
