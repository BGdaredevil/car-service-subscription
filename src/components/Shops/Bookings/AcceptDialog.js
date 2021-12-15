import { useCallback } from "react";
import { endpoints } from "../../../config/apiConfig.js";
import { post } from "../../../services/apiService.js";
import ClickButton from "../../UI/ClickButton.js";
import FormField from "../../UI/FormField.js";

function AcceptDialog({ hide, car, serviceId, shopId }) {
  const submitHandler = useCallback((e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target));

    post(`${endpoints.bookingApi}/accept`, {
      carId: car._id,
      serviceId,
      shopId,
      comment: data.comments,
    })
      .then((r) => console.log(r))
      .catch((e) => console.log(e));
  });

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
