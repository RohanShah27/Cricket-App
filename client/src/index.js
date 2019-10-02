import React from "react";
import ReactDOM from "react-dom";
import Root from "./root";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Root>
    <App />
  </Root>,
  document.getElementById("root")
);
serviceWorker.unregister();
