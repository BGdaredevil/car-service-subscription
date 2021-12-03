import { useContext } from "react";

import { AuthContext } from "../../../contexts/AuthContext.js";
import BusinessProfile from "./BusinessProfile.js";
import PersonalProfile from "./PersonalProfile.js";
import styles from "./Profile.module.css";

function Profile({ history }) {
  const { user } = useContext(AuthContext);

  return (
    <section className={styles.profile}>
      <div className={styles.userCard}></div>
      <div className={styles.controls}>
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
