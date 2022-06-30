import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/index.js";
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";
import "./reset.css";
import "./index.css";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      {console.log("pull request not working")}
      <App />
    </Provider>
  </BrowserRouter>
);
