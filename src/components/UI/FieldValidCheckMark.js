import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const FieldValidCheckMark = ({ text, isValid }) => {
  return isValid !== undefined ? (
    isValid ? (
      <>
        <FontAwesomeIcon icon={faCheck} />
      </>
    ) : (
      <>
        <FontAwesomeIcon icon={faTimes} />
        <p>{text}</p>
      </>
    )
  ) : (
    ""
  );
};

export default FieldValidCheckMark;
