import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { endpoints } from "../../../config/apiConfig.js";
import { del, get } from "../../../services/apiService.js";
import ClickButton from "../../UI/ClickButton.js";

function DetailsCar({ history }) {
  const { id } = useParams();
  const [carData, setCarData] = useState("null");

  useEffect(() => {
    get(`${endpoints.carApi}/details/${id}`)
      .then((r) => {
        console.log(r);
        setCarData(r);
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

  return (
    <section>
      <h1>Car Details</h1>
      <div className="card">
        <div className="card-header"></div>
        <div className="card-body">
          <h3>Make: {carData.make}</h3>
          <h3>Model: {carData.model}</h3>
          <h3>Year: {carData.year}</h3>
          <h3>Odometer: {carData.odometer}</h3>
          <h3>Image: TODO: Implement file upload </h3>
          <div className="history">
            {carData.workHistory?.length === 0 ? (
              <h3>no service history yet</h3>
            ) : (
              <h3>{carData.workHistory}</h3>
            )}
          </div>
        </div>
        <div className="card-footer">
          <Link to={`/car/edit/${carData._id}`}>
            <ClickButton label="edit" />
          </Link>
          <ClickButton label="delete" onClick={deleteHandler} />
          <Link to="">
            <ClickButton label="service the car" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default DetailsCar;
