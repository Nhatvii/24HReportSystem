import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "semantic-ui-css/semantic.min.css";
import * as serviceWorker from "./serviceWorker";
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(<App />, document.getElementById("root"));

// reportWebVitals();
serviceWorker.unregister();
