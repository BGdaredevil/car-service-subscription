import { Link } from "react-router-dom";
import "./InfoCard.css";

function InfoCard({ item }) {
  return (
    <div className="card-container">
      <div>
        <div className="card-image">
          <img src={item.imageUrl} alt="" className="shown" />
          <Link to={`/shop/${item._id}`} className="hidden">
            <p>Details</p>
          </Link>
        </div>
        <div className="card-body">
          <div className="inner">
            <p>
              {/**item.specification */} {item.name}
            </p>
            <p>Services: {item.offeredServices.registered?.map((x) => x.name).join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
