import ClickButton from "../../UI/ClickButton.js";
import FormField from "../../UI/FormField.js";

function AcceptDialog({ hide }) {
  return (
    <div className="accept-dialog">
      <form>
        <FormField
          label="odometer"
          type="number"
          placeholder="the actual odometer"
          name="odometer"
        />
        <textarea
          name="comments"
          id="description"
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
