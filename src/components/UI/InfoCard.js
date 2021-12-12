import { Link } from "react-router-dom";
import "./InfoCard.css";

function InfoCard({ item, isCar }) {
  const detailsLink = isCar ? `/car/${item._id}` : `/shop/${item._id}`;
  const heading = isCar ? <p>{`${item.make} ${item.model}`}</p> : <p>{item.name}</p>;
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
