import React from "react";
import "./App.scss";
import EventCreator from "./components/EventCreator/EventCreator";

const App: React.FC = () => {
  return (
    <div className="App">
      <EventCreator />
    </div>
  );
};

export default App;
