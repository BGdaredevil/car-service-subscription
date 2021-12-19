import { useState, useContext, useCallback } from "react";

import { MessageContext, mType } from "../../../contexts/MessageContext.js";

import { endpoints } from "../../../config/apiConfig.js";
import { post } from "../../../services/apiService.js";
import ClickButton from "../../UI/ClickButton.js";
import FormField from "../../UI/FormField.js";

function AcceptDialog({ hide, car, bookigngModify, bookingId }) {
  const { addMessage } = useContext(MessageContext);

  const [isSending, setIsSending] = useState(false);

  const submitHandler = useCallback(
    (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target));

      setIsSending(true);
      post(`${endpoints.bookingApi}/accept`, {
        carId: car._id,
        bookingId,
        comment: data.comments,
        odometer: data.odometer,
      })
        .then((r) => {
          setIsSending(false);
          bookigngModify(r);
          console.log(r);
          addMessage("Accepted booking for ", mType.success);
        })
        .then(hide)
        .catch((e) => console.log(e));
    },
    [car._id, hide, bookingId, bookigngModify, addMessage]
  );

  return (
    <div className="accept-dialog">
      <form onSubmit={submitHandler}>
        <FormField
          label="odometer"
          type="number"
          placeholder="the actual odometer"
          name="odometer"
          defaultValue={car.odometer}
        />
        <textarea
          name="comments"
          id="comments"
          cols="40"
          rows="1"
          placeholder="Please input your comments here"
        ></textarea>
        <div className="controls">
          <ClickButton label="confirm" disabled={isSending} />
          <ClickButton
            label="cancel"
            disabled={isSending}
            onClick={(e) => {
              e.preventDefault();
              hide();
            }}
          />
        </div>
      </form>
    </div>
  );
}

export default AcceptDialog;
