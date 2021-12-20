import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { endpoints } from "../../../config/apiConfig.js";
import { get } from "../../../services/apiService.js";
import InfoCard from "../../UI/InfoCard.js";

function BusinessProfile({ user }) {
  const [userShops, setUserShops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    get(`${endpoints.shopApi}/${user.uid}`)
      .then((r) => {
        setUserShops(r);
        setIsLoading(false);
      })
      .catch((e) => alert(e));
  }, [user.uid]);

  return (
    // <section className={`view ${isLoading ? "loading" : ""}`}>
    <div className={`container ${isLoading ? "loading" : ""}`}>
      <h1>Business</h1>
      <Link to="/shop/create">create shop</Link>
      <section>
        {userShops.length === 0 ? (
          <h3>No shops yet</h3>
        ) : (
          <div className="cards-container">
            {userShops.map((c) => (
              <InfoCard key={c._id} item={c} />
            ))}
          </div>
        )}
      </section>
    </div>
    // </section>
  );
}

export default BusinessProfile;
