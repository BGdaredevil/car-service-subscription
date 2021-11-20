import { useContext, useState } from "react";
import { Redirect } from "react-router";

import { endpoints } from "../../../config/apiConfig.js";
import { AuthContext } from "../../../contexts/AuthContext.js";
import { post } from "../../../services/apiService.js";
import { validateField } from "../../../utils/validator.js";
import ClickButton from "../../UI/ClickButton.js";
import FieldValidCheckMark from "../../UI/FieldValidCheckMark.js";
import FormField from "../../UI/FormField.js";
import styles from "./Create.module.css";

function CreateCar({ history }) {
  const { user } = useContext(AuthContext);

  const [make, setMake] = useState("");
  const [isValidMake, setIsValidMake] = useState(false);

  const [model, setModel] = useState("");
  const [isValidModel, setIsValidModel] = useState(false);

  const [year, setYear] = useState("");
  const [isValidYear, setIsValidYear] = useState(false);

  const [odometer, setOdometer] = useState("");
  const [isValidometer, setIsValidometer] = useState(false);

  const owner = user.uid;

  const submitHandler = (e) => {
    e.preventDefault();
    const cleanData = {
      make: make.trim(),
      model: model.trim(),
      year: year.trim(),
      odometer: odometer.trim(),
      owner,
    };
    console.log("submited", cleanData);

    post(endpoints.carApi, cleanData)
      .then((r) => history.push("/"))
      .catch((e) => alert(e));
  };

  if (user.accountType !== "personal") {
    return <Redirect to="/" />;
  }

  return (
    <section>
      <h1>Creating</h1>
      <form onSubmit={submitHandler}>
        <div className={styles.formFieldGroup}>
          <FormField
            label="Make"
            type="text"
            placeholder="Make"
            value={make}
            onChange={setMake}
            onInput={(e) => setIsValidMake(validateField(e.target.value, /^[a-z]+$/i))}
          />
          <FieldValidCheckMark isValid={isValidMake} text="Please input a car maker" />
        </div>
        <div className={styles.formFieldGroup}>
          <FormField
            label="Model"
            type="text"
            placeholder="Model"
            value={model}
            onChange={setModel}
            onInput={(e) => setIsValidModel(validateField(e.target.value, /^[a-z0-9]+$/i))}
          />
          <FieldValidCheckMark isValid={isValidModel} text="please input a car model" />
        </div>
        <div className={styles.formFieldGroup}>
          <FormField
            label="Year"
            type="number"
            placeholder="Year"
            value={year}
            onChange={setYear}
            onInput={(e) => setIsValidYear(validateField(e.target.value, /^[1-2]{1}[0-9]{3}$/i))}
          />
          <FieldValidCheckMark isValid={isValidYear} text="please input a manufacturing date" />
        </div>
        <div className={styles.formFieldGroup}>
          <FormField
            label="odometer"
            type="number"
            placeholder="odometer"
            value={odometer}
            onChange={setOdometer}
            onInput={(e) => setIsValidometer(validateField(e.target.value, /^[0-9]+$/i))}
          />
          <FieldValidCheckMark isValid={isValidometer} text="please input the current odometer" />
        </div>
        <div className={styles.formFieldGroup}>
          <ClickButton
            label="Create"
            disabled={!(isValidMake && isValidModel && isValidYear && isValidometer)}
          />
        </div>
      </form>
    </section>
  );
}

export default CreateCar;
