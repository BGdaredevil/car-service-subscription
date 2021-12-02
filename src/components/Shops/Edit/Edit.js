import styles from "./Edit.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import ClickButton from "../../UI/ClickButton.js";
import FormField from "../../UI/FormField.js";
import RadioBtn from "../../UI/RadioBtn.js";
import { get, patch, post } from "../../../services/apiService.js";
import { endpoints } from "../../../config/apiConfig.js";
import { AuthContext } from "../../../contexts/AuthContext.js";
import { useParams } from "react-router";
import { validateField } from "../../../utils/validator.js";
import FieldValidCheckMark from "../../UI/FieldValidCheckMark.js";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function EditShop({ history }) {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [shop, setShop] = useState();

  const [isValidName, setIsValidName] = useState(true);
  const [specification, setSpecification] = useState();
  const [services, setServices] = useState([]);

  useEffect(() => {
    get(`${endpoints.shopApi}/details/${id}`)
      .then((r) => {
        console.log(r);
        setShop(r);
        setSpecification(r.specification);
        setServices(r.offeredServices);
      })
      .catch((e) => console.log(e));
  }, [id]);

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
      offeredServices: services,
      owner: user.uid,
    };
    console.log(cleanData);

    patch(`${endpoints.shopApi}/details/${id}`, cleanData)
      .then((r) => {
        console.log(r);
        history.push("/user/profile");
      })
      .catch((e) => console.log(e));
  };

  return (
    <section>
      <h1>EDIT SHOP</h1>
      <div>
        <form onSubmit={onSubmit}>
          <div className={styles.formFieldGroup}>
            <FormField
              label="Name"
              type="text"
              placeholder="Name"
              name="name"
              defaultValue={shop?.name}
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
          <ClickButton label="Edit" type="submit" />
        </form>
      </div>
    </section>
  );
}

export default EditShop;
