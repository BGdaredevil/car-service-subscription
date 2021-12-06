import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { endpoints } from "../../../config/apiConfig.js";
import { del, get } from "../../../services/apiService.js";
import ClickButton from "../../UI/ClickButton.js";
import Service from "../RegisteredServices/Service.js";

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
          <div className="services">
            {shop.offeredServices?.notRegistered?.length > 0 ? (
              <h3>
                Please register the folowing services:
                {shop.offeredServices?.notRegistered.map((s, i) => (
                  <Service key={i} item={s} shopId={shop._id} />
                ))}
              </h3>
            ) : (
              ""
            )}
            {shop.offeredServices?.registered?.length > 0
              ? shop.offeredServices?.registered.map((s) => <Service item={s} />)
              : ""}
            {shop.offeredServices?.registered?.length === 0 &&
            shop.offeredServices?.notRegistered?.length === 0 ? (
              <h3>This shop doesn not offer public services</h3>
            ) : (
              ""
            )}
          </div>
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
