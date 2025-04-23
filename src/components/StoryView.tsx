import React, { useEffect, useRef, useState } from "react";
import "../styles/StoryView.css";
import { StoryType, StoryUserType } from "../utils/types";

interface StoryViewerProps {
  onClose: () => void;
  currentUserStories: StoryType[];
  handleNextStory: () => void;
  handlePrevStory: () => void;
  selectedUser: StoryUserType;
  markStorySeen: (userId: number, storyIndex: number) => void;
}
const STORY_DURATION = 5000;

const StoryViewer: React.FC<StoryViewerProps> = ({
  onClose,
  currentUserStories,
  handleNextStory,
  handlePrevStory,
  selectedUser,
  markStorySeen,
}) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number>(() => {
    const index = currentUserStories.findIndex((story) => !story.seen);
    return index !== -1 ? index : 0;
  });
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const timeoutRef = useRef<any>(null);
  const startTimeRef = useRef<number>(0);
  const elapsedRef = useRef<number>(0);
  const progressRefs = useRef<HTMLDivElement[]>([]);

  const currentStory = currentUserStories[currentStoryIndex];

  useEffect(() => {
    if (loading) {
      return;
    }
    updateAllProgressBars();

    if (!isPaused) {
      startProgress();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentStoryIndex, loading]);

  const updateAllProgressBars = () => {
    const totalStories = currentUserStories.length;

    for (let i = 0; i < totalStories; i++) {
      const bar = progressRefs.current[i];
      if (bar) {
        bar.style.transition = "none";
        if (i < currentStoryIndex) {
          bar.style.width = "100%";
        } else {
          bar.style.width = "0%";
        }
      }
    }
  };

  const startProgress = () => {
    markStorySeen(selectedUser.id, currentStoryIndex);
    const currentBar = progressRefs.current[currentStoryIndex];
    if (!currentBar) return;

    currentBar.style.transition = "none";
    currentBar.style.width = "0%";

    setTimeout(() => {
      currentBar.style.transition = `width ${STORY_DURATION}ms linear`;
      currentBar.style.width = "100%";
    }, 50);

    startTimeRef.current = Date.now();
    timeoutRef.current = setTimeout(goToNextStory, STORY_DURATION);
  };

  const goToNextStory = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    elapsedRef.current = 0;
    const currentBar = progressRefs.current[currentStoryIndex];
    if (currentBar) {
      currentBar.style.transition = "none";
      currentBar.style.width = "100%";
    }

    setLoading(true);
    if (currentStoryIndex === currentUserStories.length - 1) {
      handleNextStory();
      setCurrentStoryIndex(0);
    } else {
      setCurrentStoryIndex((prev) => prev + 1);
    }
  };

  const goToPrevStory = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    elapsedRef.current = 0;

    if (currentStoryIndex === 0) {
      handlePrevStory();
    } else {
      setCurrentStoryIndex((prev) => prev - 1);
    }
  };

  const pauseProgress = () => {
    if (isPaused) return;
    setIsPaused(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const elapsed = Date.now() - startTimeRef.current;
    elapsedRef.current = elapsed;

    const currentBar = progressRefs.current[currentStoryIndex];
    if (currentBar) {
      const computedStyle = window.getComputedStyle(currentBar);
      const width = computedStyle.width;
      currentBar.style.transition = "none";
      currentBar.style.width = width;
    }
  };

  const resumeProgress = () => {
    if (!isPaused) return;
    setIsPaused(false);

    const remaining = STORY_DURATION - elapsedRef.current;
    const currentBar = progressRefs.current[currentStoryIndex];
    if (currentBar) {
      currentBar.style.transition = `width ${remaining}ms linear`;
      currentBar.style.width = "100%";
    }

    startTimeRef.current = Date.now();
    timeoutRef.current = setTimeout(goToNextStory, remaining);
  };
  return (
    <div className="story-viewer-overlay">
      <div className="story-viewer">
        <div className="story-header">
          <div className="progress-bar">
            {currentUserStories.map((_, i) => (
              <div key={i} className="progress-track">
                <div
                  className="progress-fill"
                  ref={(el) => {
                    if (el) {
                      progressRefs.current[i] = el;
                    }
                  }}
                  style={{ width: i < currentStoryIndex ? "100%" : "0%" }}
                />
              </div>
            ))}
          </div>
          <img
            src={selectedUser.profile}
            className="avatar"
            alt={selectedUser.name}
          />
          <span className="username" style={{ color: "white" }}>
            {selectedUser.name}
          </span>
          <span className="timestamp">{currentStory.time}h</span>
          <button className="close-btn" onClick={onClose}>
            x
          </button>
        </div>

        <div className="story-image-container">
          {loading && (
            <div className="image-loader-overlay">
              <div className="image-spinner" />
            </div>
          )}
          <img
            key={currentStory.image}
            src={currentStory.image}
            className="story-image"
            alt="story"
            onMouseDown={pauseProgress}
            onMouseUp={resumeProgress}
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
          />

          <div
            className="left-zone"
            onMouseDown={pauseProgress}
            onMouseUp={resumeProgress}
            onClick={goToPrevStory}
          />
          <div
            className="right-zone"
            onMouseDown={pauseProgress}
            onMouseUp={resumeProgress}
            onClick={goToNextStory}
          />
        </div>

        <div className="story-reply">
          <input className="reply-input" placeholder="Message" />
          <button className="send-btn">Send</button>
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;
