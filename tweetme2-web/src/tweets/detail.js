import React, { useState } from "react";
import { ActionBtn } from "./buttons";

export function ParentTweet(props) {
  const { tweet } = props;
  return tweet.parent ? (
    <div className="row">
      <div className="col-11 mx-auto p-3 border rounded">
        <p className="mb-0 text-muted small">Retweet</p>
        <Tweet hideActions tweet={tweet.parent} className={" "} />
      </div>
    </div>
  ) : null;
}

export function Tweet(props) {
  const { tweet, didRetweet, hideActions } = props;
  const [actionTweet, setActionTweet] = useState(
    props.tweet ? props.tweet : null
  );
  let idRegex = /(?<tweetid>\d+)/;
  const path = window.location.pathname;
  const match = path.match(idRegex);
  const urlTweetId = match ? match.groups.tweetid : -1;
  const isDeatil = `${tweet.id}` === `${urlTweetId}`;
  const className = props.className
    ? props.className
    : "col-10 col-md-6 mx-auto";
  const handlePerformAction = (newActionTweet, status) => {
    if (status === 200) {
      setActionTweet(newActionTweet);
    } else if (status === 201) {
      // let the tweet list know
      if (didRetweet) {
        didRetweet(newActionTweet);
      }
    }
  };
  const handleLink = (event) => {
    event.preventDefault();
    window.location.href = `/${tweet.id}`;
  };
  return (
    <div className={className}>
      <div>
        <p>
          {tweet.id} - {tweet.content}
        </p>
        <ParentTweet tweet={tweet} />
      </div>

      <div className="btn btn-group">
        {actionTweet && hideActions !== true && (
          <React.Fragment>
            <ActionBtn
              tweet={actionTweet}
              action={{ type: "like", display: "Likes" }}
              didPerformAction={handlePerformAction}
            />
            <ActionBtn
              tweet={actionTweet}
              action={{ type: "unlike", display: "Unlike" }}
              didPerformAction={handlePerformAction}
            />
            <ActionBtn
              tweet={actionTweet}
              action={{ type: "retweet", display: "Retweet" }}
              didPerformAction={handlePerformAction}
            />
          </React.Fragment>
        )}
        {isDeatil === true ? null : (
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={handleLink}
          >
            View
          </button>
        )}
      </div>
    </div>
  );
}
