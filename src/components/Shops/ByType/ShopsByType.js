import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { endpoints } from "../../../config/apiConfig.js";
import { get } from "../../../services/apiService.js";

function ShopsByType() {
  const { type } = useParams();
  const [shops, setShops] = useState([]);

  useEffect(() => {
    get(`${endpoints.shopApi}/shops/${type}`)
      .then((r) => setShops(r))
      .catch((e) => console.log(e));
  }, [type]);

  console.log(shops);
  return (
    <section className="view">
      <div className="container">
        <h1>Shops:</h1>
        <div className="card">listings</div>
        {shops.length > 0 ? (
          shops.map((s) => <h1 key={s._id}>{s.name}</h1>)
        ) : (
          <div>No such here</div>
        )}
      </div>
    </section>
  );
}

export default ShopsByType;
