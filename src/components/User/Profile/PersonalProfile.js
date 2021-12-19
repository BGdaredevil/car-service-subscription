import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
    // <section className={`${isLoading ? "loading" : ""}`}>
    <div className={`container ${isLoading ? "loading" : ""}`}>
      <h1>Personal</h1>
      <Link to="/car/create">create car</Link>
      <section>
        {userCars.length === 0 ? (
          <h3>No cars yet</h3>
        ) : (
          <div className="cards-container">
            {userCars.map((c) => (
              <InfoCard key={c._id} item={c} isCar={true} />
            ))}
          </div>
        )}
      </section>
    </div>
    // </section>
  );
}

export default PersonalProfile;
