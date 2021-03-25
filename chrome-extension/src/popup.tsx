import * as React from "react";
import * as ReactDOM from "react-dom";
import "./styles/styles.css";
import { Link } from "react-router-dom";
import { App } from "./App";
import { init } from "@disclave/client";
import { setAnchorWrapper } from "@disclave/ui";

const firebaseConfig = JSON.parse(process.env.FIREBASE_CLIENT_CONFIG as string);
init(firebaseConfig, process.env.API_URL as string);

setAnchorWrapper((props) => <Link to={props.href} {...props} />);

const mountNode = document.getElementById("popup");
ReactDOM.render(<App />, mountNode);
