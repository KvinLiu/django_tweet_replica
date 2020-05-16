import React, { useState, useEffect } from "react";
import { loadTweets } from "../lookup";

export function ActionBtn(props) {
  const { tweet, action } = props;
  const [likes, setLikes] = useState(tweet.likes ? tweet.likes : 0);
  const [userLike, setUserLike] = useState(tweet.likes === true ? true : false);
  const className = props.className
    ? props.className
    : "btn btn-primary btn-small";
  const actionDisplay = action.display ? action.display : "Action";
  const display =
    action.type === "like" ? `${likes} ${actionDisplay}` : actionDisplay;

  const handleClick = (event) => {
    event.preventDefault();
    if (action.type === "like") {
      if (userLike === true) {
        setUserLike(false);
        setLikes(likes - 1);
      } else {
        setUserLike(true);
        setLikes(likes + 1);
      }
    }
  };
  return (
    <button className={className} onClick={handleClick}>
      {display}
    </button>
  );
}

export function Tweet(props) {
  const { tweet } = props;
  const className = props.className
    ? props.className
    : "col-10 col-md-6 mx-auto";
  return (
    <div className={className}>
      <p>
        {tweet.id} - {tweet.content}
      </p>
      <div className="btn btn-group">
        <ActionBtn tweet={tweet} action={{ type: "like", display: "Likes" }} />
        <ActionBtn
          tweet={tweet}
          action={{ type: "unlike", display: "Unlike" }}
        />
        <ActionBtn
          tweet={tweet}
          action={{ type: "retweet", display: "Retweet" }}
        />
      </div>
    </div>
  );
}

export function TweetsList() {
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    const myCallback = (response, status) => {
      if (status === 200) {
        setTweets(response);
      } else {
        alert("There was an error");
      }
    };
    loadTweets(myCallback);
  }, []);
  return (
    <div>
      {tweets.map((item, index) => {
        return (
          <Tweet
            tweet={item}
            className="my-5 py-5 border bg-white text-dark"
            key={`${index}-{item.id}`}
          />
        );
      })}
    </div>
  );
}
