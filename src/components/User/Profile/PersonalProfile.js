import { useState, useEffect } from "react";

import { endpoints } from "../../../config/apiConfig.js";
import { get } from "../../../services/apiService.js";
import InfoCard from "../../UI/InfoCard.js";

function PersonalProfile({ user }) {
  const [userCars, setUserCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    get(`${endpoints.carApi}/${user.uid}`)
      .then((r) => {
        setUserCars(r);
        setIsLoading(false);
      })
      .catch((e) => alert(e));
  }, [user.uid]);

  return (
    <div className={`container ${isLoading ? "loading" : ""}`}>
      <section>
        {userCars.length === 0 ? (
          <>
            <h3 className="no-shops">No cars yet. Try adding some :)</h3>
            <div className="cards-container">
              <InfoCard key={42} item={null} isCar={true} isDemo={true} />
            </div>
          </>
        ) : (
          <div className="cards-container">
            {userCars.map((c) => (
              <InfoCard key={c._id} item={c} isCar={true} />
            ))}
            <InfoCard key={42} item={null} isCar={true} isDemo={true} />
          </div>
        )}
      </section>
    </div>
  );
}

export default PersonalProfile;
