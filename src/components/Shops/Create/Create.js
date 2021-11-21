import { useState } from "react";

import styles from "./Create.module.css";

import FieldValidCheckMark from "../../UI/FieldValidCheckMark.js";
import FormField from "../../UI/FormField.js";
import { validateField } from "../../../utils/validator.js";
import RadioBtn from "../../UI/RadioBtn.js";
import ClickButton from "../../UI/ClickButton.js";

function CreateShop() {
  const [name, setName] = useState("");
  const [isValidName, setIsValidName] = useState(false);

  const [specification, setSpecification] = useState("bodyShop");

  const [services, setServices] = useState([]);

  const [tempService, setTempService] = useState("");

  const addHandler = (e) => {
    e.preventDefault();
    setServices((old) => [...old, tempService]);
    setTempService(() => "");
  };

  const remHandler = (item) => {
    setServices((old) => old.filter((s) => s !== item));
  };

  return (
    <section className="create-shop">
      <div>
        <h1>Creating Shop</h1>
      </div>
      <form>
        <div className={styles.formFieldGroup}>
          <FormField
            label="Name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={setName}
            onInput={(e) => setIsValidName(validateField(e.target.value, /^[a-z0-9]+$/i))}
          />
          <FieldValidCheckMark isValid={isValidName} text="Please input a name for your shop" />
        </div>
        <h3>TODO: add on click map location</h3>
        <div className={styles.formFieldGroup}>
          <RadioBtn
            label="Body Shop"
            name="specification"
            type="radio"
            value="bodyShop"
            checked={specification === "bodyShop"}
            onChange={setSpecification}
          />
          <RadioBtn
            label="Mechanic Shop"
            name="specification"
            type="radio"
            value="mechanicShop"
            checked={specification === "mechanicShop"}
            onChange={setSpecification}
          />
          <RadioBtn
            label="Performance Shop"
            name="specification"
            type="radio"
            value="performanceShop"
            checked={specification === "performanceShop"}
            onChange={setSpecification}
          />
        </div>
        <div className={styles.formFieldGroup}>
          <h4>Offered services:</h4>
          {services.length > 0 ? (
            services.map((s, i) => (
              <div key={i}>
                <h4>{s}</h4>
                <ClickButton label="Remove" type="button" onClick={() => remHandler(s)} />
              </div>
            ))
          ) : (
            <></>
          )}
          <FormField
            label="Service"
            type="text"
            placeholder="Service"
            required={false}
            value={tempService}
            onChange={setTempService}
            // onInput={(e) => setIsValidName(validateField(e.target.value, /^[a-z0-9]+$/i))}
          />
          <ClickButton label="Add" onClick={addHandler} />
        </div>
        <ClickButton label="Create" type="submit" />
      </form>
    </section>
  );
}

export default CreateShop;
