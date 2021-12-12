import { useContext, useState } from "react";
import { Redirect } from "react-router";

import { endpoints } from "../../../config/apiConfig.js";
import { AuthContext } from "../../../contexts/AuthContext.js";
import { post } from "../../../services/apiService.js";
import { validateField } from "../../../utils/validator.js";
import ClickButton from "../../UI/ClickButton.js";
import FieldValidCheckMark from "../../UI/FieldValidCheckMark.js";
import FormField from "../../UI/FormField.js";
import "./Create.css";

function CreateCar({ history }) {
  const { user } = useContext(AuthContext);

  const [isValidMake, setIsValidMake] = useState(undefined);
  const [isValidModel, setIsValidModel] = useState(undefined);
  const [isValidYear, setIsValidYear] = useState(undefined);
  const [isValidometer, setIsValidometer] = useState(undefined);
  const [isValidUrl, setIsValidUrl] = useState(undefined);

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

    post(endpoints.carApi, cleanData)
      .then((r) => history.push("/user/profile"))
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
            <div className="formFieldGroup">
              <FormField
                label="Make"
                type="text"
                placeholder="Make"
                name="make"
                onInput={(e) => setIsValidMake(validateField(e.target.value, /^[a-z]+$/i))}
              />
              <FieldValidCheckMark isValid={isValidMake} text="Please input a car maker" />
            </div>
            <div className="formFieldGroup">
              <FormField
                label="Model"
                type="text"
                placeholder="Model"
                name="model"
                onInput={(e) => setIsValidModel(validateField(e.target.value, /^[a-z0-9]+$/i))}
              />
              <FieldValidCheckMark isValid={isValidModel} text="please input a car model" />
            </div>
            <div className="formFieldGroup">
              <FormField
                label="Year"
                type="number"
                placeholder="Year"
                name="year"
                onInput={(e) =>
                  setIsValidYear(validateField(e.target.value, /^[1-2]{1}[0-9]{3}$/i))
                }
              />
              <FieldValidCheckMark isValid={isValidYear} text="please input a manufacturing date" />
            </div>
            <div className="formFieldGroup">
              <FormField
                label="odometer"
                type="number"
                placeholder="odometer"
                name="odometer"
                onInput={(e) => setIsValidometer(validateField(e.target.value, /^[0-9]+$/i))}
              />
              <FieldValidCheckMark
                isValid={isValidometer}
                text="please input the current odometer"
              />
            </div>
            <div className="formFieldGroup">
              <FormField
                label="photo"
                type="url"
                placeholder="imageUrl"
                name="imageUrl"
                onInput={(e) => setIsValidUrl(validateField(e.target.value, /^.+$/i))}
              />
              <FieldValidCheckMark isValid={isValidUrl} text="please input a valid url" />
            </div>
            <div className="formFieldGroup">
              <ClickButton
                label="Create"
                disabled={
                  !(isValidMake && isValidModel && isValidYear && isValidometer && isValidUrl)
                }
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default CreateCar;
