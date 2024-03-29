import { useContext, useState, useCallback } from "react";

import { MessageContext, mType } from "../../../contexts/MessageContext.js";

import { post } from "../../../services/apiService.js";
import { endpoints } from "../../../config/apiConfig.js";
import ClickButton from "../../UI/ClickButton.js";
import AcceptDialog from "./AcceptDialog.js";

function Booking({ car, bookigngModify, bookingId }) {
  const [dialog, setDialog] = useState(false);

  const { addMessage } = useContext(MessageContext);

  const handleReject = useCallback(() => {
    post(`${endpoints.bookingApi}/reject`, { carId: car._id, bookingId })
      .then((r) => {
        bookigngModify(r);
        addMessage("Canceled booking for", mType.success);
      })
      .catch((e) => console.log(e));
  }, [bookigngModify, car._id, bookingId, addMessage]);

  return (
    <div className="bookedCar">
      <h3>
        {car.make} {car.model} {car.year}
      </h3>
      {dialog ? (
        <AcceptDialog
          car={car}
          bookingId={bookingId}
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
