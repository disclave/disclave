import * as React from "react";
import * as ReactDOM from "react-dom";

import {App} from "./App";
import "./popup.css";

import {ChromeAdapter} from "./adapters/website/ChromeAdapter";
import {setApiAdapter, setWebsiteAdapter} from "@webchat/core";

setApiAdapter({})
setWebsiteAdapter(new ChromeAdapter())

const mountNode = document.getElementById("popup");
ReactDOM.render(<App />, mountNode);
