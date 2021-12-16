import { useState, useCallback } from "react";

import { post } from "../../../services/apiService.js";
import { endpoints } from "../../../config/apiConfig.js";

import ClickButton from "../../UI/ClickButton.js";
import AcceptDialog from "./AcceptDialog.js";

function Booking({ car, serviceId, shopId, bookigngModify }) {
  const [dialog, setDialog] = useState(false);

  const handleReject = useCallback(() => {
    post(`${endpoints.bookingApi}/reject`, { carId: car._id, serviceId, shopId })
      .then((r) => bookigngModify(r))
      .catch((e) => console.log(e));
  }, [bookigngModify, car._id, serviceId, shopId]);

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
          bookigngModify={bookigngModify}
        />
      ) : (
        <>
          <ClickButton label="accept" onClick={() => setDialog(true)} />
          <ClickButton label="reject" onClick={() => handleReject()} />
        </>
      )}
    </div>
  );
}

export default Booking;
