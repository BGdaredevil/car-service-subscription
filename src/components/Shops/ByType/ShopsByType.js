import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useContext } from "react/cjs/react.development";

import { endpoints } from "../../../config/apiConfig.js";
import { MessageContext } from "../../../contexts/MessageContext.js";
import { get } from "../../../services/apiService.js";
import InfoCard from "../../UI/InfoCard.js";

import "./ShopsByType.css";

const shopTypes = {
  mechanics: "Our best mechanics' workshops:",
  body: "Need some bodywork fix - These are our best offers:",
  performance: "Speed or clearance - The best performance engeneers are:",
};

function ShopsByType() {
  const { addMessage } = useContext(MessageContext);

  const { type } = useParams();
  const [shops, setShops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    get(`${endpoints.shopApi}/shops/${type}`)
      .then((r) => {
        r.sort((a, b) => b.rating - a.rating || a.name.localeCompare(b.name));
        setShops(r);
        setIsLoading(false);
      })
      .catch((e) => addMessage(e.message));
  }, [type, addMessage]);

  return (
    <section className={`view ${isLoading ? "loading" : ""}`}>
      <div className="container">
        <h1 className="heading-shops">{shopTypes[type]}</h1>
        <div className="cards-container">
          {shops.length > 0 ? (
            shops.map((s) => <InfoCard key={s._id} item={s} />)
          ) : (
            <div>No such here</div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ShopsByType;
