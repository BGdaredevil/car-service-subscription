import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { endpoints } from "../../../config/apiConfig.js";
import { del } from "../../../services/apiService.js";
import ClickButton from "../../UI/ClickButton.js";
import RegisterService from "./Register.js";

function Service({ item, shopId, setShop, isRegistered }) {
  const [regMode, setRegMode] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const closeForm = useCallback((setter) => setter(false));

  const delHandler = (e) => {
    del(`${endpoints.serviceApi}/${item._id}`)
      .then((r) => {
        console.log(r);
        setShop(r);
      })
      .catch((e) => console.log(e));
  };

  if (!isRegistered) {
    return (
      <>
        <div className="service">
          <h3>{item}</h3>
          <div className="service-controls">
            <ClickButton label="register" onClick={(e) => setRegMode((o) => (o ? false : true))} />
          </div>
        </div>
        {regMode ? (
          <RegisterService
            name={item}
            shopId={shopId}
            setShop={setShop}
            close={closeForm.bind(null, setRegMode)}
          />
        ) : (
          ""
        )}
      </>
    );
  } else {
    return (
      <>
        <div className="service">
          <h3>{item.name}</h3>
          <div className="service-controls">
            <ClickButton label="edit" onClick={(e) => setEditMode((o) => (o ? false : true))} />
            <ClickButton label="delete" onClick={delHandler} />
          </div>
        </div>
        {editMode ? (
          <RegisterService
            name={item.name}
            item={item}
            shopId={shopId}
            setShop={setShop}
            isEditMode={editMode}
            close={closeForm.bind(null, setEditMode)}
          />
        ) : (
          ""
        )}
      </>
    );
  }
}

export default Service;
