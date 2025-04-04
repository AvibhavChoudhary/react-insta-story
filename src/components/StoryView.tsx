import React from "react";
import "../styles/StoryView.css";

interface Story {
  id: number;
  username: string;
  profileImage: string;
  isSeen: boolean;
}

interface StoryViewerProps {
  story: Story;
  onClose: () => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ story, onClose }) => {
  return (
    <div className="story-viewer-overlay">
      <div className="story-viewer">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
        <img
          src={story.profileImage}
          alt={story.username}
          className="story-image"
        />
        <h3 className="story-username">{story.username}</h3>
      </div>
    </div>
  );
};

export default StoryViewer;
