import ClickButton from "../UI/ClickButton.js";
import FormField from "../UI/FormField.js";

function Search({ hide }) {
  return (
    <div className="search">
      <form>
        <FormField />
        <ClickButton label="search" />
      </form>
    </div>
  );
}

export default Search;
