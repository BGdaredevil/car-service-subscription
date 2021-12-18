import { useContext, useState } from "react";
import { Redirect } from "react-router";

import { endpoints } from "../../../config/apiConfig.js";
import { AuthContext } from "../../../contexts/AuthContext.js";
import { post } from "../../../services/apiService.js";
import { validateField } from "../../../utils/validator.js";
import ClickButton from "../../UI/ClickButton.js";
import FormField from "../../UI/FormField.js";

import "./Create.css";

function CreateCar({ history }) {
  const { user } = useContext(AuthContext);

  const [isValidMake, setIsValidMake] = useState(undefined);
  const [isValidModel, setIsValidModel] = useState(undefined);
  const [isValidYear, setIsValidYear] = useState(undefined);
  const [isValidometer, setIsValidometer] = useState(undefined);
  const [isValidUrl, setIsValidUrl] = useState(undefined);
  const [isSending, setIsSending] = useState(false);

  const owner = user.uid;

  const submitHandler = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const cleanData = {
      make: data.make.trim(),
      model: data.model.trim(),
      year: data.year.trim(),
      odometer: data.odometer.trim(),
      imageUrl: data.imageUrl.trim(),
      owner,
    };
    console.log("submited", cleanData);
    setIsSending(true);
    post(endpoints.carApi, cleanData)
      .then((r) => {
        history.push("/user/profile");
        setIsSending(false);
      })
      .catch((e) => alert(e));
  };

  if (user.accountType !== "personal") {
    return <Redirect push to="/" />;
  }

  return (
    <section className="create view">
      <div className="container">
        <div className="form-container">
          <div className="info">
            <h1>Creating</h1>
          </div>
          <form onSubmit={submitHandler}>
            <FormField
              label="Make"
              type="text"
              placeholder="Make"
              name="make"
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
              onInput={(e) => setIsValidModel(validateField(e.target.value, /^[a-z0-9]+$/i))}
              className={[
                isValidModel === false ? "invalid" : "",
                isValidModel ? "valid" : "",
              ].join(" ")}
            />
            {isValidModel === false ? <p className="alarm-text">Please input a car model</p> : ""}
            <FormField
              label="Year"
              type="number"
              placeholder="Year"
              name="year"
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
              pattern="https?://.+"
              onInput={(e) => setIsValidUrl(validateField(e.target.value, /^https?:\/\/.+$/i))}
              className={[isValidUrl === false ? "invalid" : "", isValidUrl ? "valid" : ""].join(
                " "
              )}
            />
            {isValidUrl === false ? <p className="alarm-text">please input a valid url</p> : ""}
            <ClickButton
              label="Create"
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

export default CreateCar;
