import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import "./Create.css";

import FormField from "../../UI/FormField.js";
import { validateField } from "../../../utils/validator.js";
import RadioBtn from "../../UI/RadioBtn.js";
import ClickButton from "../../UI/ClickButton.js";
import { AuthContext } from "../../../contexts/AuthContext.js";
import { MessageContext, mType } from "../../../contexts/MessageContext.js";
import { post } from "../../../services/apiService.js";
import { endpoints } from "../../../config/apiConfig.js";

function CreateShop({ history }) {
  const { user } = useContext(AuthContext);
  const { addMessage } = useContext(MessageContext);

  const [isValidName, setIsValidName] = useState(undefined);
  const [specification, setSpecification] = useState("bodyShop");
  const [services, setServices] = useState([]);
  const [isValidUrl, setIsValidUrl] = useState(undefined);
  const [isSending, setIsSending] = useState(false);

  const addHandler = (e) => {
    e.preventDefault();
    const tt = e.target.parentElement.querySelector("input").value.trim();
    if (tt.length === 0) {
      addMessage("Please add a service", mType.warn);
      return;
    }

    setServices((old) => {
      if (old.includes(tt)) {
        addMessage("This service is already added", mType.warn);
      }
      let t = old.filter((e) => e !== tt);
      return [...t, tt];
    });
    e.target.parentElement.querySelector("input").value = "";
  };

  const remHandler = (e, item) => {
    e.preventDefault();
    setServices((old) => {
      let temp = old.filter((s) => s !== item);
      addMessage("Removed", mType.info);
      return temp;
    });
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
    setIsSending(true);
    post(`${endpoints.shopApi}`, cleanData)
      .then((r) => {
        history.push("/user/profile");
        addMessage(`${r.name} sucessfuly created`, mType.success);
        setIsSending(false);
      })
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
            <FormField
              label="Name"
              type="text"
              placeholder="Name"
              name="name"
              onInput={(e) => setIsValidName(validateField(e.target.value, /^[a-z0-9]+$/i))}
              className={[isValidName === false ? "invalid" : "", isValidName ? "valid" : ""].join(
                " "
              )}
            />
            {isValidName === false ? (
              <p className="alarm-text">Please input a valid name for your shop</p>
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
            <div className={`services-list ${services.length <= 0 ? "invalid" : "valid"}`}>
              {services.length > 0 ? (
                <>
                  <h3 className="services-list-heading">Offered services:</h3>
                  {services.map((s, i) => (
                    <div key={i} onClick={(e) => remHandler(e, s)} className="service-item">
                      <p>{s}</p>
                      <p>
                        <FontAwesomeIcon icon={faTimes} />
                      </p>
                    </div>
                  ))}
                </>
              ) : services.length <= 0 ? (
                <p className="alarm-text">Please add your services</p>
              ) : (
                ""
              )}

              <div className={`add-service-controls`}>
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
            <ClickButton
              label="Create"
              type="submit"
              disabled={!(isValidName && isValidUrl && services.length > 0 && !isSending)}
            />
          </form>
        </div>
      </div>
    </section>
  );
}

export default CreateShop;
