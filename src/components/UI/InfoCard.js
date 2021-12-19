import { Link } from "react-router-dom";

import Stars from "./StarsRating.js";

import "./InfoCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function InfoCard({ item, isCar, isDemo }) {
  if (item === null && isDemo) {
    return isCar ? (
      <Link to="/car/create" className="">
        <FontAwesomeIcon icon={faPlus} size="10x" className="" />
        <p>Create car</p>
      </Link>
    ) : (
      <Link to="/shop/create" className="">
        <FontAwesomeIcon icon={faPlus} size="10x" className="" />
        <p>Create Shop</p>
      </Link>
    );
  }

  const detailsLink = isCar ? `/car/${item._id}` : `/shop/${item._id}`;
  const heading = isCar ? <p>{`${item.make} ${item.model}`}</p> : <p>{item.name}</p>;
  const rating = isCar ? "" : <Stars rating={item.rating} />;
  const info = isCar ? (
    <p>Year: {item.year}</p>
  ) : (
    <p>Services: {item.offeredServices.registered?.map((x) => x.name).join(", ")}</p>
  );

  return (
    <div className="card-container">
      <div>
        <div className="card-image">
          <img src={item.imageUrl} alt="" className="shown" />
          <Link to={detailsLink} className="hidden">
            <p>Details</p>
          </Link>
        </div>
        <div className="card-body">
          {rating}
          <div className="inner">
            {heading}
            {info}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
