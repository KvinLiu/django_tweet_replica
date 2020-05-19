import React from "react";
import { apiTweetAction } from "./lookup";

export function ActionBtn(props) {
  const { tweet, action, didPerformAction } = props;
  const likes = tweet.likes ? tweet.likes : 0;
  const className = props.className
    ? props.className
    : "btn btn-primary btn-small";
  const actionDisplay = action.display ? action.display : "Action";
  const display =
    action.type === "like" ? `${likes} ${actionDisplay}` : actionDisplay;

  const handleActionBackendEvent = (response, status) => {
    if ((status === 200 || status === 201) && didPerformAction) {
      didPerformAction(response, status);
    }
    // if (action.type === "like") {
    //   if (userLike === true) {
    //     setUserLike(false);
    //     setLikes(likes - 1);
    //   } else {
    //     setUserLike(true);
    //     setLikes(likes + 1);
    //   }
    // }
  };

  const handleClick = (event) => {
    event.preventDefault();
    apiTweetAction(tweet.id, action.type, handleActionBackendEvent);
  };
  return (
    <button className={className} onClick={handleClick}>
      {display}
    </button>
  );
}
