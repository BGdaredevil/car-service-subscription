import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { MessageContext, mType } from "../../../contexts/MessageContext.js";

import { endpoints } from "../../../config/apiConfig.js";
import { del, get } from "../../../services/apiService.js";
import ClickButton from "../../UI/ClickButton.js";
import HistoryList from "../History/HistoryList.js";

import "./Details.css";

function DetailsCar({ history }) {
  const { addMessage } = useContext(MessageContext);

  const { id } = useParams();
  const [carData, setCarData] = useState("null");

  useEffect(() => {
    get(`${endpoints.carApi}/details/${id}`)
      .then((r) => {
        setCarData(r);
      })
      .catch((e) => alert(e));
    get(`${endpoints.bookingApi}/car/${id}`)
      .then((r) => {
        setCarData((o) => ({ ...o, workHistory: r }));
      })
      .catch((e) => alert(e));
  }, [id]);

  const deleteHandler = () => {
    del(`${endpoints.carApi}/${carData._id}`)
      .then((r) => {
        console.log(r);
        history.push("/user/profile");
      })
      .catch((e) => console.log(e));
  };

  const cleanRejectedService = (booking) => {
    setCarData((car) => {
      const updatedCar = {
        ...car,
        workHistory: car.workHistory.filter((b) => b._id !== booking._id),
      };
      addMessage("Removed", mType.info);
      return updatedCar;
    });
  };

  const handleFeedback = (booking) => {
    setCarData((car) => {
      const updatedCar = {
        ...car,
        workHistory: car.workHistory.map((b) => (b._id === booking._id ? booking : b)),
      };
      addMessage("Feedback is sent", mType.info);
      return updatedCar;
    });
  };

  return (
    <section className="view">
      <div className="container">
        <div className="details-card">
          <div className="details-header">
            <h1>Car Details</h1>
            <h3>Make: {carData.make}</h3>
            <h3>Model: {carData.model}</h3>
            <h3>Year: {carData.year}</h3>
            <h3>Odometer: {carData.odometer}</h3>
          </div>
          <div className="car-details-body">
            <div className="">
              <img className="car-image" src={carData.imageUrl} alt="a car" />
            </div>
            <div className="">
              <HistoryList
                list={carData.workHistory}
                cleanRejectedService={cleanRejectedService}
                handleFeedback={handleFeedback}
              />
            </div>
          </div>
          <div className="car-details-footer details-footer">
            <Link to={`/car/edit/${carData._id}`}>
              <ClickButton label="edit" />
            </Link>
            <Link to="">
              <ClickButton label="delete" onClick={deleteHandler} />
            </Link>
            <Link to="">
              <ClickButton label="service the car" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DetailsCar;
