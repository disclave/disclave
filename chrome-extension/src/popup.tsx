import * as React from "react";
import * as ReactDOM from "react-dom";
import "./styles/styles.css";
import { App } from "./App";
import { init } from "@webchat/client";

const firebaseConfig = JSON.parse(process.env.FIREBASE_CLIENT_CONFIG as string);
init(firebaseConfig, process.env.API_URL as string);

const mountNode = document.getElementById("popup");
ReactDOM.render(<App />, mountNode);
