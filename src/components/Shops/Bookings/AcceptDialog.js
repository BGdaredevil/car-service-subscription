import { useCallback } from "react";
import { endpoints } from "../../../config/apiConfig.js";
import { post } from "../../../services/apiService.js";
import ClickButton from "../../UI/ClickButton.js";
import FormField from "../../UI/FormField.js";

function AcceptDialog({ hide, car, bookigngModify, bookingId }) {
  const submitHandler = useCallback(
    (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target));

      post(`${endpoints.bookingApi}/accept`, {
        carId: car._id,
        bookingId,
        comment: data.comments,
        odometer: data.odometer,
      })
        .then((r) => bookigngModify(r))
        .then(hide)
        .catch((e) => console.log(e));
    },
    [car._id, hide, bookingId, bookigngModify]
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
          <ClickButton label="confirm" />
          <ClickButton
            label="cancel"
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
