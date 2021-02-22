import * as React from "react";
import "./App.css";
import {useChat} from "./hooks/useChat";
import {UIExample} from "@webchat/ui";

export const App = () => {
  const [messages, addMessage] = useChat();

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Web Chat extension {JSON.stringify(messages)} ??
        </p>
        <UIExample text="from extension" />
      </header>
    </div>
  );
};
