import { useContext, useEffect } from "react";

import { AuthContext } from "../../../contexts/AuthContext.js";
import BusinessProfile from "./BusinessProfile.js";
import PersonalProfile from "./PersonalProfile.js";
import styles from "./Profile.module.css";

function Profile() {
  const { user, decorateUser } = useContext(AuthContext);

  useEffect(() => {
    decorateUser();
  }, []);

  // const [allUserData, setAllUserData] = useState(null);

  // useEffect(() => {
  //   get(`${endpoints.userApi}/${user.uid}`)
  //     .then((res) => setAllUserData(res))
  //     .catch((e) => alert(e));
  // }, []);

  // console.log(allUserData);

  // if (!user) {
  //   return <div>LOADING</div>;
  // }

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
