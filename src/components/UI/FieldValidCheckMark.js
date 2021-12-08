import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const FieldValidCheckMark = ({ text, isValid }) => {
  return isValid !== undefined ? (
    isValid ? (
      <div className="pesho">
        <FontAwesomeIcon icon={faCheck} />
      </div>
    ) : (
      <div className="pesho">
        <FontAwesomeIcon icon={faTimes} />
        <p>{text}</p>
      </div>
    )
  ) : (
    ""
  );
};

export default FieldValidCheckMark;
