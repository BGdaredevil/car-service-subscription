import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { endpoints } from "../../config/apiConfig.js";
import { AuthContext } from "../../contexts/AuthContext.js";
import { get, patch } from "../../services/apiService.js";
import ClickButton from "../UI/ClickButton.js";

function Visit({ shopId, hide, setShop, service }) {
  const { user } = useContext(AuthContext);
  const [userCars, setUserCars] = useState([]);

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
      })
      .catch((e) => alert(e));
  }, [user.uid, service.bookings]);

  const confirmHandler = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    data.shop = shopId;

    patch(`${endpoints.serviceApi}/${service._id}`, data)
      .then((r) => {
        console.log(r);
        setShop(r);
        hide(e);
      })
      .catch((e) => console.log(e));
  };

  return userCars.length > 0 ? (
    <form onSubmit={confirmHandler}>
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
    <ClickButton label="booked all cars" disabled />
  );
}

export default Visit;
