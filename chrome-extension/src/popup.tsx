import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./App";
import { init } from "@webchat/client";

// TODO: get all data from env

const firebaseConfig = JSON.parse(config);
init(firebaseConfig, url);

const mountNode = document.getElementById("popup");
ReactDOM.render(<App />, mountNode);
