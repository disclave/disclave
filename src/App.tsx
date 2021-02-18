import * as React from "react";
import logo from "./logo.svg";
import "./App.css";

export const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Web Chat extension
        </p>
      </header>
    </div>
  );
};
