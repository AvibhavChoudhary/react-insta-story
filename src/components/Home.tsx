import React from "react";
import "../styles/Home.css";
import Navbar from "./Navbar";
import Stories from "./Stories";
import Feed from "./Feed";

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <Navbar />
      <Stories />
      <Feed />
    </div>
  );
};

export default Home;
