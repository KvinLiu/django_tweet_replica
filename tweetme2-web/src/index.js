import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import { TweetsComponent, TweetDetailComponent, FeedComponent } from "./tweets";
import { ProfileBadgeComponent } from "./profiles";
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

const tweetFeedEl = document.getElementById("tweetme-2-feed");
if (tweetFeedEl) {
  ReactDOM.render(e(FeedComponent, tweetFeedEl.dataset), tweetFeedEl);
}

const tweetDetailEls = document.querySelectorAll(".tweetme-2-detail");
tweetDetailEls.forEach((container) => {
  ReactDOM.render(e(TweetDetailComponent, container.dataset), container);
});

const userProfileBadgeEls = document.querySelectorAll(
  ".tweetme-2-profile-badge"
);
userProfileBadgeEls.forEach((container) => {
  ReactDOM.render(e(ProfileBadgeComponent, container.dataset), container);
});
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
