import { useState } from "react";
import { Link } from "react-router-dom";
import ClickButton from "../../UI/ClickButton.js";
import RegisterService from "./Register.js";

function Service({ item, shopId, setShop }) {
  let service;
  let isRegistered = typeof item !== "string";

  if (isRegistered) {
    service = item;
  } else {
    service = { name: item };
  }

  const [regMode, setRegMode] = useState(false);

  if (!isRegistered) {
    return (
      <div>
        <h3>{service.name}</h3>
        <ClickButton label="register" onClick={(e) => setRegMode((o) => (o ? false : true))} />
        {regMode ? (
          <RegisterService
            name={service.name}
            shopId={shopId}
            setShop={setShop}
            setRegMode={setRegMode}
          />
        ) : (
          ""
        )}
      </div>
    );
  } else {
    return (
      <div>
        <h3>{service.name}</h3>
        <Link to={`/service/edit/${item._id}`}>
          <ClickButton label="edit" />
        </Link>
        <Link to={`/service/delete/${item._id}`}>
          <ClickButton label="delete" />
        </Link>
      </div>
    );
  }
}

export default Service;
