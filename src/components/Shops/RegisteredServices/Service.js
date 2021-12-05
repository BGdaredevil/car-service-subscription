import { Link } from "react-router-dom";
import ClickButton from "../../UI/ClickButton.js";

function Service({ item }) {
  let service;
  let isRegistered = typeof item !== "string";

  if (isRegistered) {
    service = item;
  } else {
    service = { name: item };
  }

  return (
    <div>
      <h3>{service.name}</h3>
      {!isRegistered ? (
        <Link to={`/service/register?name=${service.name}`}>
          <ClickButton label="register" />
        </Link>
      ) : (
        <>
          <Link to="/service/edit">
            <ClickButton label="edit" />
          </Link>
          <Link to="/service/delete">
            <ClickButton label="delete" />
          </Link>
        </>
      )}
    </div>
  );
}

export default Service;
