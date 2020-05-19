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

  return (
    <div className={className}>
      <div>
        <p>
          {tweet.id} - {tweet.content}
        </p>
        <ParentTweet tweet={tweet} />
      </div>
      {actionTweet && hideActions !== true && (
        <div className="btn btn-group">
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
        </div>
      )}
    </div>
  );
}
