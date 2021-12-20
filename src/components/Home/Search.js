import ClickButton from "../UI/ClickButton.js";
import FormField from "../UI/FormField.js";

function Search({ onSubmit }) {
  return (
    <div className="search">
      <form onSubmit={onSubmit}>
        <FormField
          label="service"
          type="text"
          placeholder="service"
          name="service"
          autoFocus={true}
        />
        <ClickButton label="search" />
      </form>
    </div>
  );
}

export default Search;
