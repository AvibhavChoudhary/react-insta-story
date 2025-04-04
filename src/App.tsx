// src/App.tsx
import React from "react";
import "./App.css"; // Import global styles
import Home from "./components/Home";

const App: React.FC = () => {
  return (
    <div className="app">
      <Home />
    </div>
  );
};

export default App;
