import { useState, useEffect, useContext } from "react";

import { MessageContext, mType } from "../../contexts/MessageContext.js";

import { endpoints } from "../../config/apiConfig.js";
import { AuthContext } from "../../contexts/AuthContext.js";
import { get, patch } from "../../services/apiService.js";
import ClickButton from "../UI/ClickButton.js";

function Visit({ shopId, hide, setShop, service }) {
  const { user } = useContext(AuthContext);
  const { addMessage } = useContext(MessageContext);

  const [userCars, setUserCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    get(`${endpoints.carApi}/${user.uid}`)
      .then((r) => {
        const bookingIds = service.bookings.map((e) => e.car._id);
        const temp = r.reduce((a, e) => {
          if (!bookingIds.includes(e._id)) {
            a.push(e);
          }
          return a;
        }, []);
        setUserCars(temp);
        setIsLoading(false);
      })
      .catch((e) => alert(e));
  }, [user.uid, service.bookings]);

  const confirmHandler = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    data.shop = shopId;
    setIsLoading(true);
    patch(`${endpoints.serviceApi}/${service._id}`, data)
      .then((r) => {
        console.log(r);
        setShop(r);
        hide(e);
        setIsLoading(false);
        addMessage("Booked a visit for your vehicle", mType.success);
      })
      .catch((e) => console.log(e));
  };

  return userCars.length > 0 ? (
    <form onSubmit={confirmHandler} className={`${isLoading ? "loading" : ""}`}>
      <select id="car" name="car">
        {userCars.map((c) => (
          <option key={c._id} value={c._id}>
            {c.make} {c.model}
          </option>
        ))}
      </select>
      <ClickButton label="confirm" />
      <ClickButton label="cancel" onClick={hide} />
    </form>
  ) : (
    <form className={`view ${isLoading ? "loading" : ""}`}>
      <ClickButton label="booked all cars" disabled className={`${isLoading ? "loading" : ""}`} />
    </form>
  );
}

export default Visit;
