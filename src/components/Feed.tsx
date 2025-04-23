import { feedData } from "../constants/feedData";
import Post from "./Post";
import "../styles/Feed.css";

function Feed() {
  return (
    <div className="feed-container">
      {feedData.map((feedPost) => {
        return (
          <Post
            key={feedPost.id}
            caption={feedPost.caption}
            image={feedPost.postImage}
            username={feedPost.username}
          />
        );
      })}
    </div>
  );
}

export default Feed;
