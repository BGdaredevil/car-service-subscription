import { useCallback } from "react";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { endpoints } from "../../../config/apiConfig.js";
import { AuthContext } from "../../../contexts/AuthContext.js";
import { del, get, put } from "../../../services/apiService.js";
import ClickButton from "../../UI/ClickButton.js";
import Bookings from "../Bookings/Bookings.js";
import Services from "../RegisteredServices/Services.js";
import "./Details.css";

function DetailsShop({ history }) {
  const { id } = useParams();
  const [shop, setShop] = useState("");

  const { user } = useContext(AuthContext);

  useEffect(() => {
    get(`${endpoints.shopApi}/details/${id}`)
      .then((r) => {
        setShop(r);
      })
      .catch((e) => console.log(e));
  }, [id]);

  const bookigngModify = useCallback((booking) => {
    put(`${endpoints.serviceApi}/${booking.service}`, booking)
      .then((r) => {
        setShop((oldShop) => {
          const regedServices = oldShop.offeredServices.registered;
          const service = regedServices.filter((s) => s._id === booking.service)[0];
          const newServices = regedServices.filter((s) => s._id !== service._id);
          const serviceBookingList = service.bookings.filter((b) => b._id !== booking._id);
          service.bookings = serviceBookingList;
          newServices.push(service);
          oldShop.offeredServices.registered = newServices.sort((a, b) =>
            a._id.localeCompare(b._id)
          );
          return { ...oldShop };
        });
      })
      .catch((e) => console.log(e));
  }, []);

  const deleteHandler = useCallback(
    (e) => {
      del(`${endpoints.shopApi}/${shop._id}`)
        .then((r) => {
          console.log(r);
          history.push("/user/profile");
        })
        .catch((e) => console.log(e));
    },
    [shop._id, history]
  );

  return (
    <section className="view">
      <div className="container">
        <div className="details-card">
          <div className="details-header">
            <h1>Shop Details</h1>
            <h3>Name: {shop.name}</h3>
            <h3>Specialization: {shop.specification}</h3>
            <h3>Rating: {shop.rating?.toFixed(2)}</h3>
          </div>
          <div className="details-body">
            <div className="left">
              <img className="shop-image" src={shop.imageUrl} alt="a car" />
            </div>
            <div className="right">
              <Services
                setShop={setShop}
                shop={shop}
                isOwner={shop.owner === user.uid}
                isPersonal={user.accountType === "personal"}
              />
            </div>
          </div>
          {shop.owner === user.uid && shop.owner !== undefined ? (
            <>
              <Bookings
                services={shop.offeredServices?.registered}
                shopId={shop._id}
                bookigngModify={bookigngModify}
              />
              <div className="details-footer">
                <Link to={`/shop/edit/${shop._id}`}>
                  <ClickButton label="edit shop" />
                </Link>
                <ClickButton label="delete shop" onClick={deleteHandler} />
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
}

export default DetailsShop;
