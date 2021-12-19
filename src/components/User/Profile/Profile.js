import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext.js";
import BusinessProfile from "./BusinessProfile.js";
import PersonalProfile from "./PersonalProfile.js";

import "./Profile.css";

function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <section className="profile view">
      <div className="userCardContainer">
        <div className="innerContainer">
          <div className="picture">
            <div className="avatar">
              <FontAwesomeIcon icon={faUserSecret} size="10x" className="profile-icon" />
            </div>
          </div>
          <div className="userDetails">
            <h3>Username: {user.username}</h3>
            <h3>Email: {user.email}</h3>
            <h3>Account: {user.accountType}</h3>
            <h3>Member since: {user.metadata?.creationTime}</h3>
          </div>
        </div>
      </div>
      <div className="controls">
        {user.accountType === "business" ? (
          <BusinessProfile user={user} />
        ) : user.accountType === "personal" ? (
          <PersonalProfile user={user} />
        ) : (
          ""
        )}
      </div>
    </section>
  );
}

export default Profile;
