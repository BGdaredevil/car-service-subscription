import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

// import "./Create.css";

import FieldValidCheckMark from "../../UI/FieldValidCheckMark.js";
import FormField from "../../UI/FormField.js";
import { validateField } from "../../../utils/validator.js";
import RadioBtn from "../../UI/RadioBtn.js";
import ClickButton from "../../UI/ClickButton.js";
import { AuthContext } from "../../../contexts/AuthContext.js";
import { post } from "../../../services/apiService.js";
import { endpoints } from "../../../config/apiConfig.js";

function CreateShop({ history }) {
  const { user } = useContext(AuthContext);
  const [isValidName, setIsValidName] = useState(undefined);
  const [specification, setSpecification] = useState("bodyShop");
  const [services, setServices] = useState([]);
  const [isValidUrl, setIsValidUrl] = useState(undefined);

  const addHandler = (e) => {
    e.preventDefault();
    const tt = e.target.parentElement.querySelector("input").value.trim();
    if (tt.length === 0) {
      return;
    }

    setServices((old) => {
      let t = old.filter((e) => e !== tt);
      return [...t, tt];
    });
    e.target.parentElement.querySelector("input").value = "";
  };

  const remHandler = (e, item) => {
    e.preventDefault();
    setServices((old) => old.filter((s) => s !== item));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const cleanData = {
      name: data.name.trim(),
      specification: data.specification.trim(),
      services: services,
      imageUrl: data.imageUrl.trim(),
      owner: user.uid,
    };
    console.log(cleanData);

    post(`${endpoints.shopApi}`, cleanData)
      .then((r) => history.push("/user/profile"))
      .catch((e) => console.log(e));
  };

  return (
    <section className="create view">
      <div className="container">
        <div className="form-container">
          <div className="info">
            <h1>Creating Shop</h1>
          </div>
          <form onSubmit={onSubmit} className="formClass">
            <div className="formFieldGroup">
              <FormField
                label="Name"
                type="text"
                placeholder="Name"
                name="name"
                onInput={(e) => setIsValidName(validateField(e.target.value, /^[a-z0-9]+$/i))}
              />
              <FieldValidCheckMark isValid={isValidName} text="Please input a name for your shop" />
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
            <h3>TODO: add on click map location</h3>
            <div className="formFieldGroup">
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
            <div className="formFieldGroup">
              <h4>Offered services:</h4>
              {services.length > 0 ? (
                services.map((s, i) => (
                  // <div key={i}>
                  <h4 key={i} onClick={(e) => remHandler(e, s)}>
                    {s}
                    <FontAwesomeIcon icon={faTimes} />
                  </h4>
                  // </div>
                ))
              ) : (
                <FieldValidCheckMark
                  text={"Please add your services"}
                  isValid={services.length > 0}
                />
              )}
              <div>
                <FormField
                  label="Service"
                  type="text"
                  placeholder="Service"
                  required={false}
                  onKeyPress={addHandler}
                />
                <ClickButton label="Add" onClick={addHandler} />
              </div>
            </div>
            <ClickButton label="Create" type="submit" />
          </form>
        </div>
      </div>
    </section>
  );
}

export default CreateShop;
