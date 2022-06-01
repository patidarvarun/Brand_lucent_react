import React from "react";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript

//const tokenVariable = localStorage.getItem("data");
// var jwt = require("jsonwebtoken");
// var decoded = jwt.decode(tokenVariable);
// if (decoded.exp * 1000 < Date.now()) {
//   setTimeout(() => {
//     window.location = "/";
//   }, 1000);
// }
// console.log("tokenVariable", decoded.exp);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
