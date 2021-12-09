import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import "./FieldValidCheckMark.css";

const FieldValidCheckMark = ({ text, isValid }) => {
  return isValid !== undefined ? (
    isValid ? (
      <div className="icon-container valid">
        <FontAwesomeIcon icon={faCheck} />
      </div>
    ) : (
      <div className="icon-container invalid">
        <FontAwesomeIcon icon={faTimes} />
        <p>{text}</p>
      </div>
    )
  ) : (
    ""
  );
};

export default FieldValidCheckMark;
