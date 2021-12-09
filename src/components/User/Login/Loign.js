// import styles from "./Login.module.css";

import { useContext, useState } from "react";
import FormField from "../../UI/FormField.js";
import ClickButton from "../../UI/ClickButton.js";
import { validateField } from "../../../utils/validator.js";
import FieldValidCheckMark from "../../UI/FieldValidCheckMark.js";
import { AuthContext } from "../../../contexts/AuthContext.js";
import { Redirect } from "react-router";

function Login({ history }) {
  const { user, login } = useContext(AuthContext);

  const [isValidEmail, setValidEmail] = useState(undefined);

  const [isValidPassword, setValidPassword] = useState(undefined);

  const submitHandler = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const cleanData = {
      email: data.email.trim(),
      password: data.password.trim(),
    };
    // console.log("submited", cleanData, isValidEmail && isValidPassword);
    login(cleanData)
      .then(() => history.push("/"))
      .catch((err) => alert(err));
  };

  if (user) {
    history.goBack();
    return null;
  }

  return (
    <section className="loginSection view">
      <div className="info">
        <h2>Wellcome back</h2>
      </div>
      <form className="formClass" onSubmit={submitHandler}>
        <div className="formFieldGroup">
          <FormField
            label="Email"
            type="email"
            placeholder="email_12@domain.com"
            name="email"
            onInput={(e) =>
              setValidEmail(validateField(e.target.value, /^\w+@{1}\w+\.{1}[a-z]{2,3}$/i))
            }
          />
          <FieldValidCheckMark
            isValid={isValidEmail}
            text="Email must be valid to mailbox@domain.bg/com"
          />
        </div>
        <div className="formFieldGroup">
          <FormField
            label="Password"
            type="password"
            placeholder="password"
            name="password"
            onInput={(e) => setValidPassword(validateField(e.target.value, /^.{4,}$/i))}
          />
          <FieldValidCheckMark
            isValid={isValidPassword}
            text="Password must be at least 4 chars long"
          />
        </div>
        <div className="formFieldGroup">
          <ClickButton label="Login" disabled={!(isValidEmail && isValidPassword)} />
        </div>
      </form>
    </section>
  );
}

export default Login;
