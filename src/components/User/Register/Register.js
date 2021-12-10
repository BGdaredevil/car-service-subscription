import { useContext, useState } from "react";

// import styles from "./Register.module.css";

import FormField from "../../UI/FormField.js";
import RadioBtn from "../../UI/RadioBtn.js";
import ClickButton from "../../UI/ClickButton.js";
import { validateField } from "../../../utils/validator.js";
import FieldValidCheckMark from "../../UI/FieldValidCheckMark.js";
import { AuthContext } from "../../../contexts/AuthContext.js";
import { Redirect } from "react-router";

function Register({ history }) {
  const { user, register } = useContext(AuthContext);

  const [isValidName, setValidName] = useState(undefined);

  const [isValidEmail, setValidEmail] = useState(undefined);

  const [password, setPassword] = useState("");
  const [isValidPassword, setValidPassword] = useState(undefined);

  const [isValidPassMatch, setValidPassMatch] = useState(undefined);

  const [accType, setAccType] = useState("personal");

  const submitHandler = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    const cleanData = {
      username: data.username.trim(),
      email: data.email.trim(),
      password: data.password.trim(),
      accountType: data.accountType.trim(),
      isPassMatch: data.isValidPassMatch,
    };

    register(cleanData)
      .then(() => history.push("/"))
      .catch((err) => alert(err));
  };

  if (user) {
    return <Redirect push to="/" />;
  }

  return (
    <section className="registerSection view">
      <div className="container">
        <div className="form-container">
          <div className="info">
            <h2>To have one less care</h2>
          </div>
          <form onSubmit={submitHandler} className="formClass">
            {/* <div className="formFieldGroup"> */}
            <FormField
              label="Username"
              name="username"
              type="text"
              placeholder="username"
              onInput={(e) => setValidName(validateField(e.target.value, /^[a-z]{3,}$/i))}
              className={[isValidName === false ? "invalid" : "", isValidName ? "valid" : ""].join(
                " "
              )}
            />
            <FieldValidCheckMark
              isValid={isValidName}
              text="Username must be at least 3 long. No special characters allowed."
            />
            {/* </div> */}
            {/* <div className="formFieldGroup"> */}
            <FormField
              label="Email"
              name="email"
              type="email"
              placeholder="email_12@domain.com"
              onInput={(e) =>
                setValidEmail(validateField(e.target.value, /^\w+@{1}\w+\.{1}[a-z]{2,3}$/i))
              }
            />
            <FieldValidCheckMark
              isValid={isValidEmail}
              text="Email must be valid to mailbox@domain.bg/com"
            />
            {/* </div> */}
            {/* <div className="formFieldGroup"> */}
            <FormField
              label="Password"
              name="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={setPassword}
              onInput={(e) => setValidPassword(validateField(e.target.value, /^.{6,}$/i))}
            />
            <FieldValidCheckMark
              isValid={isValidPassword}
              text="Password must be at least 6 chars long"
            />
            {/* </div> */}
            {/* <div className="formFieldGroup"> */}
            <FormField
              label="Repeat password"
              name="repeatPassword"
              type="password"
              placeholder="repeat password"
              onInput={(e) => setValidPassMatch(e.target.value === password)}
            />
            <FieldValidCheckMark isValid={isValidPassMatch} text="Passwords do not match" />
            {/* </div> */}
            <RadioBtn
              label="Business account"
              name="accountType"
              type="radio"
              value="business"
              checked={accType === "business"}
              onChange={setAccType}
            />
            <RadioBtn
              label="Personal account"
              name="accountType"
              type="radio"
              value="personal"
              checked={accType === "personal"}
              onChange={setAccType}
            />
            {/* <div className="formFieldGroup"> */}
            <ClickButton
              label="Register"
              disabled={
                !(isValidName && isValidEmail && isValidPassword && isValidPassMatch && accType)
              }
            />
            {/* </div> */}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Register;
