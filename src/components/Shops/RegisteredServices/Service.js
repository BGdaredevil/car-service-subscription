import { useState } from "react";
import { Link } from "react-router-dom";
import ClickButton from "../../UI/ClickButton.js";
import RegisterService from "./Register.js";

function Service({ item, shopId, setShop, isRegistered }) {
  const [regMode, setRegMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  if (!isRegistered) {
    return (
      <div>
        <h3>{item}</h3>
        <ClickButton label="register" onClick={(e) => setRegMode((o) => (o ? false : true))} />
        {regMode ? (
          <RegisterService name={item} shopId={shopId} setShop={setShop} setRegMode={setRegMode} />
        ) : (
          ""
        )}
      </div>
    );
  } else {
    return (
      <div>
        <h3>{item.name}</h3>
        <ClickButton label="edit" />
        <ClickButton label="delete" />
      </div>
    );
  }
}

export default Service;
