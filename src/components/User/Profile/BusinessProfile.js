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
    <div className={`container ${isLoading ? "loading" : ""}`}>
      <section>
        {userShops.length === 0 ? (
          <>
            <h3 className="no-shops">No shops yet. Try adding some :)</h3>
            <div className="cards-container">
              <InfoCard key={42} item={null} isDemo={true} />
            </div>
          </>
        ) : (
          <div className="cards-container">
            {userShops.map((c) => (
              <InfoCard key={c._id} item={c} />
            ))}
            <InfoCard key={42} item={null} isDemo={true} />
          </div>
        )}
      </section>
    </div>
  );
}

export default BusinessProfile;
