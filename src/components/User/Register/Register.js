import { useContext, useState } from "react";
import { Redirect } from "react-router";

import FormField from "../../UI/FormField.js";
import RadioBtn from "../../UI/RadioBtn.js";
import ClickButton from "../../UI/ClickButton.js";
import { validateField } from "../../../utils/validator.js";
import { AuthContext } from "../../../contexts/AuthContext.js";

function Register({ history }) {
  const { isAuth, register } = useContext(AuthContext);

  const [isValidName, setValidName] = useState(undefined);
  const [isValidEmail, setValidEmail] = useState(undefined);
  const [password, setPassword] = useState("");
  const [isValidPassword, setValidPassword] = useState(undefined);
  const [isValidPassMatch, setValidPassMatch] = useState(undefined);
  const [accType, setAccType] = useState("personal");
  const [isSending, setIsSending] = useState(false);

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
    setIsSending(true);
    register(cleanData)
      .then(() => {
        setIsSending(false);
        history.push("/");
      })
      .catch((err) => alert(err));
  };

  if (isAuth) {
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
            {isValidName === false ? (
              <p className="alarm-text">
                Username must be at least 3 long. No special characters allowed.
              </p>
            ) : (
              ""
            )}
            <FormField
              label="Email"
              name="email"
              type="text"
              placeholder="email_12@domain.com"
              onInput={(e) =>
                setValidEmail(validateField(e.target.value, /^\w+@{1}\w+\.{1}[a-z]{2,3}$/i))
              }
              className={[
                isValidEmail === false ? "invalid" : "",
                isValidEmail ? "valid" : "",
              ].join(" ")}
            />
            {isValidEmail === false ? (
              <p className="alarm-text">Email must be valid to mailbox@domain.bg/com</p>
            ) : (
              ""
            )}
            <FormField
              label="Password"
              name="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={setPassword}
              onInput={(e) => setValidPassword(validateField(e.target.value, /^.{6,}$/i))}
              className={[
                isValidPassword === false ? "invalid" : "",
                isValidPassword ? "valid" : "",
              ].join(" ")}
            />
            {isValidPassword === false ? (
              <p className="alarm-text">Password must be at least 6 chars long</p>
            ) : (
              ""
            )}

            <FormField
              label="Repeat password"
              name="repeatPassword"
              type="password"
              placeholder="repeat password"
              onInput={(e) => setValidPassMatch(e.target.value === password)}
              className={[
                isValidPassMatch === false ? "invalid" : "",
                isValidPassMatch ? "valid" : "",
              ].join(" ")}
            />
            {isValidPassMatch === false ? <p className="alarm-text">Passwords do not match</p> : ""}

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
            <ClickButton
              label="Register"
              disabled={
                !(
                  isValidName &&
                  isValidEmail &&
                  isValidPassword &&
                  isValidPassMatch &&
                  accType &&
                  !isSending
                )
              }
            />
          </form>
        </div>
      </div>
    </section>
  );
}

export default Register;
