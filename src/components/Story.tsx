import React from "react";
import "../styles/Story.css";
import { StoryType } from "../utils/types";

interface Props {
  username: string;
  image: string;
  handleStoryClick: () => void;
  stories: StoryType[];
}

const Story: React.FC<Props> = ({
  stories,
  username,
  image,
  handleStoryClick,
}) => {
  const isAllSeen = stories.every((item) => item.seen === true);
  return (
    <section className="avatar-wrapper" onClick={handleStoryClick}>
      <div className={`avatar-box ${isAllSeen && "story-seen"}`}>
        <img className="avatar-profile-image" src={image} alt="" />
      </div>
      <div className="avatar-name">{username}</div>
    </section>
  );
};

export default Story;
