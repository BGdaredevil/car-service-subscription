import { useState, useEffect } from "react";
import { useParams } from "react-router";

import { endpoints } from "../../../config/apiConfig.js";
import { get, patch } from "../../../services/apiService.js";
import { validateField } from "../../../utils/validator.js";
import ClickButton from "../../UI/ClickButton.js";
import FormField from "../../UI/FormField.js";

// import "./Edit.css";

function EditCar({ history }) {
  const { id } = useParams();
  const [car, setCar] = useState({});

  const [isValidMake, setIsValidMake] = useState(true);
  const [isValidModel, setIsValidModel] = useState(true);
  const [isValidYear, setIsValidYear] = useState(true);
  const [isValidometer, setIsValidometer] = useState(true);
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    get(`${endpoints.carApi}/details/${id}`)
      .then((c) => setCar(c))
      .catch((e) => {
        console.log(e);
        alert(e);
      });
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    const cleanData = {
      make: data.make.trim(),
      model: data.model.trim(),
      year: data.year.trim(),
      odometer: data.odometer.trim(),
      imageUrl: data.imageUrl.trim(),
    };

    // console.log(cleanData);
    setIsSending(true);
    patch(`${endpoints.carApi}/details/${car._id}`, cleanData)
      .then((r) => {
        history.push(`/car/${car._id}`);
        setIsSending(false);
      })
      .catch((e) => console.log(e));
  };

  return (
    <section className="editSection view">
      <div className="container">
        <div className="form-container">
          <form method="post" onSubmit={onSubmit}>
            <FormField
              label="Make"
              type="text"
              placeholder="Make"
              name="make"
              defaultValue={car?.make}
              onInput={(e) => setIsValidMake(validateField(e.target.value, /^[a-z]+$/i))}
              className={[isValidMake === false ? "invalid" : "", isValidMake ? "valid" : ""].join(
                " "
              )}
            />
            {isValidMake === false ? <p className="alarm-text">Please input a car maker</p> : ""}
            <FormField
              label="Model"
              type="text"
              placeholder="Model"
              name="model"
              defaultValue={car?.model}
              onInput={(e) => setIsValidModel(validateField(e.target.value, /^[a-z0-9]+$/i))}
              className={[
                isValidModel === false ? "invalid" : "",
                isValidModel ? "valid" : "",
              ].join(" ")}
            />
            {isValidModel === false ? <p className="alarm-text">please input a car model</p> : ""}
            <FormField
              label="Year"
              type="number"
              placeholder="Year"
              name="year"
              defaultValue={car?.year}
              onInput={(e) => setIsValidYear(validateField(e.target.value, /^[1-2]{1}[0-9]{3}$/i))}
              className={[isValidYear === false ? "invalid" : "", isValidYear ? "valid" : ""].join(
                " "
              )}
            />
            {isValidYear === false ? (
              <p className="alarm-text">please input a manufacturing date</p>
            ) : (
              ""
            )}
            <FormField
              label="odometer"
              type="number"
              placeholder="odometer"
              name="odometer"
              defaultValue={car?.odometer}
              onInput={(e) => setIsValidometer(validateField(e.target.value, /^[0-9]+$/i))}
              className={[
                isValidometer === false ? "invalid" : "",
                isValidometer ? "valid" : "",
              ].join(" ")}
            />
            {isValidometer === false ? (
              <p className="alarm-text">please input the current odometer</p>
            ) : (
              ""
            )}
            <FormField
              label="photo"
              type="url"
              placeholder="imageUrl"
              name="imageUrl"
              defaultValue={car?.imageUrl}
              onInput={(e) => setIsValidUrl(validateField(e.target.value, /^https?:\/\/.+$/i))}
              className={[isValidUrl === false ? "invalid" : "", isValidUrl ? "valid" : ""].join(
                " "
              )}
            />
            {isValidUrl === false ? <p className="alarm-text">please input a valid url</p> : ""}
            <ClickButton
              label="Edit"
              disabled={
                !(
                  isValidMake &&
                  isValidModel &&
                  isValidYear &&
                  isValidometer &&
                  isValidUrl &&
                  !isSending
                )
              }
            />
          </form>
        </div>
      </div>
    </section>
  );
}

export default EditCar;
