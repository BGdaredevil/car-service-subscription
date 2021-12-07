import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { endpoints } from "../../../config/apiConfig.js";
import { del, get } from "../../../services/apiService.js";
import ClickButton from "../../UI/ClickButton.js";
import Services from "../RegisteredServices/Services.js";

function DetailsShop({ history }) {
  const { id } = useParams();
  const [shop, setShop] = useState("");

  useEffect(() => {
    get(`${endpoints.shopApi}/details/${id}`)
      .then((r) => {
        console.log(r);
        setShop(r);
      })
      .catch((e) => console.log(e));
  }, [id]);

  const deleteHandler = (e) => {
    del(`${endpoints.shopApi}/${shop._id}`)
      .then((r) => {
        console.log(r);
        history.push("/user/profile");
      })
      .catch((e) => console.log(e));
  };

  return (
    <section>
      <h1>Shop Details</h1>
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">
          <h3>Name: {shop.name}</h3>
          <h3>Specialization: {shop.specification}</h3>
          <h3>Location: TODO: Implement pins on map</h3>
          <h3>Image: TODO: Implement file upload </h3>
          <div>
            <img src={shop.imageUrl} alt="a car" />
          </div>
          <h3>Rating: {shop.rating}</h3>
          <Services setShop={setShop} shop={shop} />
        </div>
        <div className="card-footer">
          <Link to={`/shop/edit/${shop._id}`}>
            <ClickButton label="edit shop" />
          </Link>
          <ClickButton label="delete shop" onClick={deleteHandler} />
          {/* <Link to="/pesho">
            <ClickButton label="service the car" />
          </Link> */}
        </div>
      </div>
    </section>
  );
}

export default DetailsShop;
