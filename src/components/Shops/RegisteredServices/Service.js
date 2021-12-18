import { useState, useCallback } from "react";

import { endpoints } from "../../../config/apiConfig.js";
import { del, put } from "../../../services/apiService.js";
import ClickButton from "../../UI/ClickButton.js";
import Visit from "../../Visit/Visit.js";
import RegisterService from "./Register.js";

function Service({ item, shopId, setShop, isRegistered, isOwner, isPersonal }) {
  const [regMode, setRegMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showVisit, setShowVisit] = useState(false);

  const closeForm = useCallback((setter) => setter(false), []);

  const delHandler = useCallback(
    (e) => {
      del(`${endpoints.serviceApi}/${item._id}`)
        .then((r) => {
          console.log(r);
          setShop(r);
        })
        .catch((e) => console.log(e));
    },
    [item._id, setShop]
  );

  const visitHandler = useCallback((e) => {
    setShowVisit((o) => (o ? false : true));
  }, []);

  const removeHandler = useCallback(
    (e) => {
      put(`${endpoints.shopApi}/details/${shopId}`, { item })
        .then((r) => setShop(r))
        .catch((e) => console.log(e));
    },
    [item, setShop, shopId]
  );

  const ownerView = !isRegistered ? (
    <>
      <div className="service">
        <h3>{item}</h3>
        <ClickButton label="register" onClick={(e) => setRegMode((o) => (o ? false : true))} />
        <ClickButton label="remove" onClick={removeHandler} />
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
  ) : (
    <>
      <div className="service">
        <h3>{item.name}</h3>
        <ClickButton label="edit" onClick={(e) => setEditMode((o) => (o ? false : true))} />
        <ClickButton label="delete" onClick={delHandler} />
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
  const visitorVIew = (
    <div className="service">
      <div>
        <h3>
          {item.name}: {item.price} USD
        </h3>
        <h4>Description: {item.description}</h4>
      </div>
      {isPersonal ? (
        <>
          {showVisit ? (
            <Visit
              shopId={shopId}
              setShop={setShop}
              service={item}
              hide={(e) => {
                e.preventDefault();
                setShowVisit(false);
              }}
            />
          ) : (
            <ClickButton label="Book a visit" onClick={visitHandler} />
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );

  return isOwner ? ownerView : !isRegistered ? "" : visitorVIew;
}

export default Service;
