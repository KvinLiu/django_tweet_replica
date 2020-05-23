import React, { useState, useEffect } from "react";
import { apiTweetList } from "./lookup";
import { Tweet } from "./detail";

export function TweetsList(props) {
  const [tweetsInit, setTweetsInit] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [tweetsDidSet, setTweetsDidSet] = useState(false);
  const [nextUrl, setNextUrl] = useState(null);

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
          setNextUrl(response.next);
          setTweetsInit(response.results);
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

  return (
    <React.Fragment>
      {tweets.map((item, index) => {
        return (
          <Tweet
            tweet={item}
            didRetweet={handleDidRetweet}
            className="my-5 py-5 border bg-white text-dark"
            key={`${index}-{item.id}`}
          />
        );
      })}
      {nextUrl !== null && (
        <button className="btn btn-outline-primary">Load next</button>
      )}
    </React.Fragment>
  );
}
