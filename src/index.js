import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";
import store from "./store";
import * as serviceWorker from "./serviceWorker";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import "./doc/scss/master.scss";
import "font-awesome/css/font-awesome.min.css";
import "swiper/swiper.scss";
import "react-modal-video/scss/modal-video.scss";
import "simple-line-icons/css/simple-line-icons.css";
import "rc-datetime-picker/dist/picker.min.css";
import "rc-datetime-picker/dist/picker.css";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// reportWebVitals();
serviceWorker.unregister();
