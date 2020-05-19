import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { TweetsComponent, TweetDetailComponent } from "./tweets";
import * as serviceWorker from "./serviceWorker";

// const appEl = document.getElementById("root");
// if (appEl) {
//   ReactDOM.render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>,
//     appEl
//   );
// }
const e = React.createElement;
const tweetsEl = document.getElementById("tweetme-2");
if (tweetsEl) {
  ReactDOM.render(e(TweetsComponent, tweetsEl.dataset), tweetsEl);
}

const tweetDetailEls = document.querySelectorAll(".tweetme-2-detail");
tweetDetailEls.forEach((container) => {
  ReactDOM.render(e(TweetDetailComponent, container.dataset), container);
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
