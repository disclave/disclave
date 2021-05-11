import * as React from "react";
import * as ReactDOM from "react-dom";
import "./styles/styles.css";
import { Link } from "react-router-dom";
import { App } from "./App";
import "./init";
import { setAnchorWrapper } from "@disclave/ui";

setAnchorWrapper((props) => <Link to={props.href} {...props as any} />);

const mountNode = document.getElementById("popup");
ReactDOM.render(<App />, mountNode);
