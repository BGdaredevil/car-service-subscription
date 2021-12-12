import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { endpoints } from "../../config/apiConfig.js";
import { AuthContext } from "../../contexts/AuthContext.js";
import { get, patch } from "../../services/apiService.js";
import ClickButton from "../UI/ClickButton.js";

function Visit({ shopId, serviceId, hide }) {
  const { user } = useContext(AuthContext);
  const [userCars, setUserCars] = useState([]);

  useEffect(() => {
    get(`${endpoints.carApi}/${user.uid}`)
      .then((r) => {
        console.log(r);
        setUserCars(r);
      })
      .catch((e) => alert(e));
  }, [user.uid]);

  const confirmHandler = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    data.shop = shopId;

    patch(`${endpoints.serviceApi}/${serviceId}`, data)
      .then((r) => console.log(r))
      .catch((e) => console.log(e));
  };

  return (
    <form onSubmit={confirmHandler}>
      <select id="car" name="car">
        {userCars.map((c) => (
          <option value={c._id}>
            {c.make} {c.model}
          </option>
        ))}
      </select>
      <ClickButton label="confirm" />
      <ClickButton label="cancel" onClick={hide} />
    </form>
  );
}

export default Visit;
