import { useState, useEffect } from "react";
import { useParams } from "react-router";

import { endpoints } from "../../../config/apiConfig.js";
import { get } from "../../../services/apiService.js";
import InfoCard from "../../UI/InfoCard.js";

function ShopsByType() {
  const { type } = useParams();
  const [shops, setShops] = useState([]);

  useEffect(() => {
    get(`${endpoints.shopApi}/shops/${type}`)
      .then((r) => setShops(r))
      .catch((e) => console.log(e));
  }, [type]);

  return (
    <section className="view">
      <div className="container">
        <h1>Shops:</h1>
        <div className="card">listings</div>
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
