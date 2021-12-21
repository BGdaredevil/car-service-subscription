import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ClickButton from "../UI/ClickButton.js";
import FormField from "../UI/FormField.js";

import "./Search.css";

function Search({ onSubmit, hide }) {
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
        <ClickButton
          label={<FontAwesomeIcon icon={faSearch} size="lg" className="profile-icon" />}
        />
        <ClickButton
          label={<FontAwesomeIcon icon={faTimes} size="lg" className="profile-icon" />}
          onClick={(e) => {
            e.preventDefault();
            hide();
          }}
        />
      </form>
    </div>
  );
}

export default Search;
