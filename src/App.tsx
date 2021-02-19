import * as React from "react";
import "./App.css";
import {useChat} from "./hooks/useChat";

export const App = () => {
  const [messages, addMessage] = useChat();

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Web Chat extension {JSON.stringify(messages)} ??
        </p>
      </header>
    </div>
  );
};
