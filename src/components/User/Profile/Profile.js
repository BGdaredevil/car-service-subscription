import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { get } from "../../../services/apiService.js";
import { AuthContext } from "../../../contexts/AuthContext.js";
import { endpoints } from "../../../config/apiConfig.js";
import styles from "./Profile.module.css";

function Profile() {
  const { user } = useContext(AuthContext);

  const [allUserData, setAllUserData] = useState(null);

  useEffect(() => {
    get(`${endpoints.userApi}/${user.uid}`)
      .then((res) => setAllUserData(res))
      .catch((e) => alert(e));
  }, []);

  console.log(allUserData);

  if (!allUserData) {
    return <div>LOADING</div>;
  }

  return (
    <section className={styles.profile}>
      <div className={styles.userCard}></div>
      <div className={styles.controls}>
        {allUserData.accountType === "business" ? (
          <Link to="/shop/create">create shop</Link>
        ) : (
          <Link to="/car/create">create car</Link>
        )}
      </div>
    </section>
  );
}

export default Profile;
