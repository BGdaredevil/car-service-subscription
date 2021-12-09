import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { endpoints } from "../../../config/apiConfig.js";
import { get, patch } from "../../../services/apiService.js";
import { validateField } from "../../../utils/validator.js";
import ClickButton from "../../UI/ClickButton.js";
import FieldValidCheckMark from "../../UI/FieldValidCheckMark.js";
import FormField from "../../UI/FormField.js";

import styles from "./Edit.module.css";

function EditCar({ history }) {
  const { id } = useParams();
  const [car, setCar] = useState({});

  const [isValidMake, setIsValidMake] = useState(true);
  const [isValidModel, setIsValidModel] = useState(true);
  const [isValidYear, setIsValidYear] = useState(true);
  const [isValidometer, setIsValidometer] = useState(true);
  const [isValidUrl, setIsValidUrl] = useState(undefined);

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

    console.log(cleanData);

    patch(`${endpoints.carApi}/details/${car._id}`, cleanData)
      .then((r) => history.push(`/car/${car._id}`))
      .catch((e) => console.log(e));
  };

  return (
    <section className="edit view">
      <div>
        <form method="post" onSubmit={onSubmit}>
          <div className={styles.formFieldGroup}>
            <FormField
              label="Make"
              type="text"
              placeholder="Make"
              name="make"
              defaultValue={car?.make}
              onInput={(e) => setIsValidMake(validateField(e.target.value, /^[a-z]+$/i))}
            />
            <FieldValidCheckMark isValid={isValidMake} text="Please input a car maker" />
          </div>
          <div className={styles.formFieldGroup}>
            <FormField
              label="Model"
              type="text"
              placeholder="Model"
              name="model"
              defaultValue={car?.model}
              onInput={(e) => setIsValidModel(validateField(e.target.value, /^[a-z0-9]+$/i))}
            />
            <FieldValidCheckMark isValid={isValidModel} text="please input a car model" />
          </div>
          <div className={styles.formFieldGroup}>
            <FormField
              label="Year"
              type="number"
              placeholder="Year"
              name="year"
              defaultValue={car?.year}
              onInput={(e) => setIsValidYear(validateField(e.target.value, /^[1-2]{1}[0-9]{3}$/i))}
            />
            <FieldValidCheckMark isValid={isValidYear} text="please input a manufacturing date" />
          </div>
          <div className={styles.formFieldGroup}>
            <FormField
              label="odometer"
              type="number"
              placeholder="odometer"
              name="odometer"
              defaultValue={car?.odometer}
              onInput={(e) => setIsValidometer(validateField(e.target.value, /^[0-9]+$/i))}
            />
            <FieldValidCheckMark isValid={isValidometer} text="please input the current odometer" />
          </div>
          <div className={styles.formFieldGroup}>
            <FormField
              label="photo"
              type="url"
              placeholder="imageUrl"
              name="imageUrl"
              defaultValue={car?.imageUrl}
              onInput={(e) => setIsValidUrl(validateField(e.target.value, /^.+$/i))}
            />
            <FieldValidCheckMark isValid={isValidometer} text="please input the current odometer" />
          </div>
          <div className={styles.formFieldGroup}>
            <ClickButton
              label="Edit"
              disabled={
                !(isValidMake && isValidModel && isValidYear && isValidometer && isValidUrl)
              }
            />
          </div>
        </form>
      </div>
    </section>
  );
}

export default EditCar;
