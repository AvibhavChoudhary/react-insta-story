import React, { useRef, useState } from "react";
import "../styles/Stories.css";
import { userStoriesData } from "../constants/storyData";
import Story from "./Story";
import StoryViewer from "./StoryView";
import { StoryType, StoryUserType } from "../utils/types";

const Stories: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [selectedUser, setSelectedUser] = useState<null | StoryUserType>(null);
  const [currentProfileIndex, setCurrentProfileIndex] = useState<null | number>(
    null
  );
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [storiesData, setStoriesData] = useState(userStoriesData);
  const [currentUserStories, setCurrentUserStories] = useState<StoryType[]>([]);

  const handleStoryClick = (userData: StoryUserType, index: number) => {
    setSelectedUser(userData);
    setCurrentProfileIndex(index);
    setCurrentUserStories(userData.stories);
  };

  const closeViewer = () => {
    setSelectedUser(null);
    setCurrentProfileIndex(null);
  };

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 400;
      const newScrollPosition =
        carouselRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);

      carouselRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const handleNextStory = () => {
    if (currentProfileIndex === storiesData.length - 1) {
      closeViewer();
    } else {
      setSelectedUser(storiesData[(currentProfileIndex as number) + 1]);
      setCurrentProfileIndex((prev) => prev + 1);
      setCurrentUserStories(
        storiesData[(currentProfileIndex as number) + 1].stories
      );
    }
  };

  const handlePrevStory = () => {
    if (currentProfileIndex === 0) {
      closeViewer();
    } else {
      setSelectedUser(storiesData[(currentProfileIndex as number) - 1]);
      setCurrentProfileIndex((prev) => prev - 1);
      setCurrentUserStories(
        storiesData[(currentProfileIndex as number) - 1].stories
      );
    }
  };
  const markStorySeen = (userId: number, storyIndex: number) => {
    const temp = storiesData.map((user) => {
      if (user.id === userId) {
        user.stories[storyIndex].seen = true;
        return user;
      }
      return user;
    });
    setStoriesData(temp);
  };
  return (
    <div className="stories">
      {showLeftButton && (
        <div
          onClick={() => scrollCarousel("left")}
          aria-label="Scroll left"
          role="button"
        >
          <img
            className="scroll-button left"
            src="src/assets/svg/left-arrow.svg"
            alt="Arrow"
          />
        </div>
      )}
      <div className="carousel" ref={carouselRef} onScroll={handleScroll}>
        {storiesData.map((item, index) => {
          return (
            <Story
              key={item.id}
              image={item.profile}
              username={item.name}
              handleStoryClick={() => handleStoryClick(item, index)}
              stories={item.stories}
            />
          );
        })}
      </div>

      {showRightButton && (
        <div
          onClick={() => scrollCarousel("right")}
          aria-label="Scroll right"
          role="button"
        >
          <img
            className="scroll-button right"
            src="src/assets/svg/right-arrow.svg"
            alt="Arrow"
          />
        </div>
      )}
      {selectedUser && (
        <StoryViewer
          onClose={closeViewer}
          currentUserStories={currentUserStories}
          handleNextStory={handleNextStory}
          handlePrevStory={handlePrevStory}
          selectedUser={selectedUser}
          markStorySeen={markStorySeen}
        />
      )}
    </div>
  );
};

export default Stories;
