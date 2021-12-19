import { useState, useEffect } from "react";
import { useParams } from "react-router";

import { endpoints } from "../../../config/apiConfig.js";
import { get } from "../../../services/apiService.js";
import InfoCard from "../../UI/InfoCard.js";

const shopTypes = {
  mechanics: "Our best mechanics' workshops:",
  body: "Need some bodywork fix - These are our best offers:",
  performance: "Speed or clearance - The best performance engeneers are:",
};

function ShopsByType() {
  const { type } = useParams();
  const [shops, setShops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    get(`${endpoints.shopApi}/shops/${type}`)
      .then((r) => {
        // console.log(r);
        r.sort((a, b) => b.rating - a.rating || a.name.localeCompare(b.name));
        setShops(r);
        setIsLoading(false);
      })
      .catch((e) => console.log(e));
  }, [type]);

  return (
    <section className={`view ${isLoading ? "loading" : ""}`}>
      <div className="container">
        <h1>{shopTypes[type]}</h1>
        <div className="card"></div>
        {shops.length > 0 ? (
          shops.map((s) => <InfoCard key={s._id} item={s} />)
        ) : (
          <div>No such here</div>
        )}
      </div>
    </section>
  );
}

export default ShopsByType;
