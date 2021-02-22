import * as React from "react";
import * as ReactDOM from "react-dom";

import {App} from "./App";
import "./popup.css";

import {setAdapter as setApiAdapter} from "./adapters/api";
import {setAdapter as setWebsiteAdapter} from "./adapters/website";
import {ChromeAdapter} from "./adapters/website/ChromeAdapter";

setApiAdapter({})
setWebsiteAdapter(new ChromeAdapter())

const mountNode = document.getElementById("popup");
ReactDOM.render(<App />, mountNode);
