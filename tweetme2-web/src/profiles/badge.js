import React, { useState, useEffect } from "react";

import { UserDisplay, UserPicture } from "./components";
import { apiProfileDetail, apiProfileFollowToggle } from "./lookup";
import { DisplayCount } from "./utils";

function ProfileBadge(props) {
  const { user, didFollowToggle, profileLoading } = props;
  let currentVerb = user && user.is_following ? "Unfollow" : "Follow";
  currentVerb = profileLoading ? "Loading..." : currentVerb;
  const handleFollowToggle = (event) => {
    event.preventDefault();
    if (didFollowToggle && !profileLoading) {
      didFollowToggle(currentVerb);
    }
  };
  return user ? (
    <div>
      <UserPicture user={user} hideLink />
      <p>
        <UserDisplay user={user} includeFullName hideLink />
      </p>
      <p>
        <DisplayCount>{user.followers_count}</DisplayCount>{" "}
        {user.follower_count === 1 ? "follower" : "followers"}
      </p>
      <p>
        <DisplayCount>{user.following_count}</DisplayCount> following
      </p>
      <p>{user.location}</p>
      <p>{user.bio}</p>
      <button className="btn btn-primary" onClick={handleFollowToggle}>
        {currentVerb}
      </button>
    </div>
  ) : null;
}
export function ProfileBadgeComponent(props) {
  const { username } = props;
  const [didLookup, setDidLookup] = useState(false);
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const handleBackendLookup = (resp, status) => {
    if (status === 200) {
      setProfile(resp);
    }
  };
  // lookup
  useEffect(() => {
    if (didLookup === false) {
      apiProfileDetail(username, handleBackendLookup);
      setDidLookup(true);
    }
  }, [username, didLookup, setDidLookup]);
  const handleNewFollow = (actionVerb) => {
    apiProfileFollowToggle(username, actionVerb, (res, status) => {
      console.log(res, status);
      if (status === 200) {
        setProfile(res);
      }
      setProfileLoading(false);
    });
    setProfileLoading(true);
  };
  return didLookup === false ? (
    "Loading..."
  ) : profile ? (
    <ProfileBadge
      user={profile}
      didFollowToggle={handleNewFollow}
      profileLoading={profileLoading}
    />
  ) : null;
}
