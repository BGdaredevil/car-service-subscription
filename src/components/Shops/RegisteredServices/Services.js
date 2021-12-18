import Service from "./Service.js";
import "./Services.css";

function Services({ shop, setShop, isOwner, isPersonal }) {
  const notRegisteredHeading =
    shop.offeredServices?.notRegistered?.length && isOwner > 0 ? (
      <h3 className="service-heading">Please register the folowing services:</h3>
    ) : !isOwner && !(shop.offeredServices?.registered?.length > 0) ? (
      <h3 className="service-heading">This shop does not offer public services</h3>
    ) : (
      <h3 className="service-heading">We offer the folowing services</h3>
    );
  const notRegistered =
    shop.offeredServices?.notRegistered?.length > 0
      ? shop.offeredServices?.notRegistered.map((s, i) => (
          <Service
            key={i}
            item={s}
            shopId={shop._id}
            setShop={setShop}
            isOwner={isOwner}
            isRegistered={false}
          />
        ))
      : "";
  const registered =
    shop.offeredServices?.registered?.length > 0
      ? shop.offeredServices?.registered.map((s) => (
          <Service
            key={s._id}
            item={s}
            isRegistered={true}
            shopId={shop._id}
            setShop={setShop}
            isOwner={isOwner}
            isPersonal={isPersonal}
          />
        ))
      : "";
  const noServices =
    shop.offeredServices?.registered?.length === 0 &&
    shop.offeredServices?.notRegistered?.length === 0 ? (
      <h3>This shop doesn not offer public services</h3>
    ) : (
      ""
    );

  return (
    <div className="services">
      {notRegisteredHeading}
      {notRegistered}
      {registered}
      {noServices}
    </div>
  );
}

export default Services;
