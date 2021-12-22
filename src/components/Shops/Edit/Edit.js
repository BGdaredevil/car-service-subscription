import "./Edit.css";

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";

import ClickButton from "../../UI/ClickButton.js";
import FormField from "../../UI/FormField.js";
import RadioBtn from "../../UI/RadioBtn.js";
import { get, patch } from "../../../services/apiService.js";
import { endpoints } from "../../../config/apiConfig.js";
import { AuthContext } from "../../../contexts/AuthContext.js";
import { validateField } from "../../../utils/validator.js";
import { MessageContext, mType } from "../../../contexts/MessageContext.js";

function EditShop({ history }) {
  const { id } = useParams();

  const { user } = useContext(AuthContext);
  const { addMessage } = useContext(MessageContext);

  const [shop, setShop] = useState();
  const [isValidName, setIsValidName] = useState(true);
  const [specification, setSpecification] = useState();
  const [services, setServices] = useState([]);
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    get(`${endpoints.shopApi}/details/${id}`)
      .then((r) => {
        // console.log(r);
        setShop(r);
        setSpecification(r.specification);
        setServices(r.offeredServices.notRegistered || []);
      })
      .catch((e) => console.log(e));
  }, [id]);

  const addHandler = (e) => {
    e.preventDefault();
    const tt = e.target.parentElement.querySelector("input").value.trim();
    if (tt.length === 0) {
      addMessage("Please add a service", mType.warn);
      return;
    }

    if (services.includes(tt)) {
      addMessage("This service is already added", mType.warn);
      return;
    }

    setServices((old) => [...old, tt]);
    e.target.parentElement.querySelector("input").value = "";
  };

  const remHandler = (e, item) => {
    e.preventDefault();
    addMessage("Removed", mType.info);
    setServices((old) => [...old.filter((s) => s !== item)]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const cleanData = {
      name: data.name.trim(),
      specification: data.specification.trim(),
      offeredServices: { notRegistered: services },
      imageUrl: data.imageUrl.trim(),
      owner: user.uid,
    };
    // console.log(cleanData);

    setIsSending(true);

    patch(`${endpoints.shopApi}/details/${id}`, cleanData)
      .then((r) => {
        // console.log(r);
        addMessage(`${r.name} sucessfuly updated`, mType.success);
        history.push(`/shop/${id}`);
      })
      .catch((e) => console.log(e));
  };

  return (
    <section className="editSection view">
      <div className="container">
        <div className="form-container">
          <div className="info">
            <h1>EDIT SHOP</h1>
          </div>
          <form onSubmit={onSubmit}>
            <FormField
              label="Name"
              type="text"
              placeholder="Name"
              name="name"
              defaultValue={shop?.name}
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
              defaultValue={shop?.imageUrl}
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
              label="Edit"
              type="submit"
              disabled={!(isValidName && isValidUrl && services.length > 0 && !isSending)}
            />
          </form>
        </div>
      </div>
    </section>
  );
}

export default EditShop;
