import { useState } from "react";
import { Link } from "react-router-dom";
import ClickButton from "../../UI/ClickButton.js";
import RegisterService from "./Register.js";
import Service from "./Service.js";

function Services({ shop, setShop }) {
  return (
    <div className="services">
      {shop.offeredServices?.notRegistered?.length > 0 ? (
        <h3>
          Please register the folowing services:
          {shop.offeredServices?.notRegistered.map((s, i) => (
            <Service key={i} item={s} shopId={shop._id} setShop={setShop} isRegistered={false} />
          ))}
        </h3>
      ) : (
        ""
      )}
      {shop.offeredServices?.registered?.length > 0
        ? shop.offeredServices?.registered.map((s) => (
            <Service key={s._id} item={s} isRegistered={true} />
          ))
        : ""}
      {shop.offeredServices?.registered?.length === 0 &&
      shop.offeredServices?.notRegistered?.length === 0 ? (
        <h3>This shop doesn not offer public services</h3>
      ) : (
        ""
      )}
    </div>
  );
}

export default Services;
