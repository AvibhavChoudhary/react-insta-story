import React from "react";
import "../styles/Story.css";

interface Props {
  username: string;
  image: string;
  handleStoryClick: () => void;
}

const Story: React.FC<Props> = ({ username, image, handleStoryClick }) => {
  return (
    <section className="avatar-wrapper" onClick={handleStoryClick}>
      <div className="avatar-box">
        <img className="avatar-profile-image" src={image} alt="" />
      </div>
      <div className="avatar-name">{username}</div>
    </section>
  );
};

export default Story;
