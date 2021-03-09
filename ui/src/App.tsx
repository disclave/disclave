import React from "react";
import "./App.css";

function App() {
  return (
    <div className="w-full h-screen mx-auto container flex flex-col items-center justify-center">
      <div className="items-center flex flex-col items-center bg-blue-400 px-16 py-12 rounded-lg shadow-xl">
        <div className="text-2xl text-white font-extrabold ">
          React + Tailwind + Storybook
        </div>
        <div className="text-lg text-white font-medium">
          Much awesome frontend development!
        </div>
      </div>
    </div>
  );
}

export default App;
