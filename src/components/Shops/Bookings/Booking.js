import { useState } from "react";
import ClickButton from "../../UI/ClickButton.js";
import AcceptDialog from "./AcceptDialog.js";

function Booking({ car, serviceId, shopId }) {
  const [dialog, setDialog] = useState(false);

  return (
    <div className="bookedCar">
      <h3>
        {car.make} {car.model} {car.year}
      </h3>
      {dialog ? (
        <AcceptDialog
          car={car}
          serviceId={serviceId}
          shopId={shopId}
          hide={setDialog.bind(null, false)}
        />
      ) : (
        <>
          <ClickButton label="accept" onClick={() => setDialog(true)} />
          <ClickButton label="reject" />
        </>
      )}
    </div>
  );
}

export default Booking;
