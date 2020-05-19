import React, { useState, useEffect } from "react";
import { apiTweetList, apiTweetCreate, apiTweetAction } from "./lookup";

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

export function TweetsComponent(props) {
  // console.log(props);
  const { username } = props;
  const textAreaRef = React.createRef();
  const [newTweets, setNewTweets] = useState([]);
  const canTweet = props.canTweet === "false" ? false : true;
  const handleBackendUpdate = (response, status) => {
    // backend api response handler
    let tempNewTweets = [...newTweets];
    if (status === 201) {
      tempNewTweets.unshift(response);
      setNewTweets(tempNewTweets);
    } else {
      console.log(response);
      alert("An error occured, please try again");
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newVal = textAreaRef.current.value;
    // backend api request
    apiTweetCreate(newVal, handleBackendUpdate);
    textAreaRef.current.value = "";
  };
  return (
    <div className={props.className}>
      {canTweet === true && (
        <div className="col-12 mb-3">
          <form onSubmit={handleSubmit}>
            <textarea
              ref={textAreaRef}
              required={true}
              className="form-control"
              name="tweet"
            ></textarea>
            <button className="btn btn-primary my-3" type="submit">
              Tweet
            </button>
          </form>
        </div>
      )}
      <TweetsList newTweets={newTweets} username={username} />
    </div>
  );
}

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

export function TweetsList(props) {
  const [tweetsInit, setTweetsInit] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [tweetsDidSet, setTweetsDidSet] = useState(false);

  useEffect(() => {
    let final = [...props.newTweets].concat(tweetsInit);
    if (final.length !== tweets.length) {
      setTweets(final);
    }
  }, [props.newTweets, tweets, tweetsInit]);

  useEffect(() => {
    const handleTweetListLookup = (response, status) => {
      if (tweetsDidSet === false) {
        if (status === 200) {
          setTweetsInit(response);
          setTweetsDidSet(true);
        } else {
          alert("There was an error");
        }
      }
    };
    apiTweetList(props.username, handleTweetListLookup);
  }, [tweetsInit, tweetsDidSet, setTweetsDidSet, props.username]);

  const handleDidRetweet = (newTweet) => {
    const updateTweetsInit = [...tweetsInit];
    updateTweetsInit.unshift(newTweet);
    setTweetsInit(updateTweetsInit);
    const updateFinalTweet = [...tweets];
    updateFinalTweet.unshift(newTweet);
    setTweets(updateFinalTweet);
  };

  return tweets.map((item, index) => {
    return (
      <Tweet
        tweet={item}
        didRetweet={handleDidRetweet}
        className="my-5 py-5 border bg-white text-dark"
        key={`${index}-{item.id}`}
      />
    );
  });
}
