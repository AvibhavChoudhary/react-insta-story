import React, { useRef, useState } from "react";
import "../styles/Stories.css";
import { storiesData } from "../constants/storyData";
import Story from "./Story";
import StoryViewer from "./StoryView";

const Stories: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [selectedStory, setSelectedStory] = useState<
    null | (typeof storiesData)[0]
  >(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // scroll speed
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleStoryClick = (story: (typeof storiesData)[0]) => {
    setSelectedStory(story);
  };

  const closeViewer = () => {
    setSelectedStory(null);
  };

  return (
    <div className="stories">
      <div
        className="carousel"
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {storiesData.map((item) => {
          return (
            <Story
              key={item.id}
              image={item.profileImage}
              username={item.username}
              handleStoryClick={() => handleStoryClick(item)}
            />
          );
        })}
      </div>

      {selectedStory && (
        <StoryViewer story={selectedStory} onClose={closeViewer} />
      )}
    </div>
  );
};

export default Stories;
