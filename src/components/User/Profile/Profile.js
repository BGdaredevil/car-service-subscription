import { useContext } from "react";

import { AuthContext } from "../../../contexts/AuthContext.js";
import BusinessProfile from "./BusinessProfile.js";
import PersonalProfile from "./PersonalProfile.js";
import "./Profile.css";

function Profile({ history }) {
  const { user } = useContext(AuthContext);

  return (
    <section className="profile">
      <div className="userCard"></div>
      <div className="controls">
        {user.accountType === "business" ? (
          <BusinessProfile user={user} />
        ) : (
          <PersonalProfile user={user} />
        )}
      </div>
    </section>
  );
}

export default Profile;
