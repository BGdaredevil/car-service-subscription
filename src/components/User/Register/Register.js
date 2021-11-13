import { useContext, useState } from "react";

import styles from "./Register.module.css";

import FormField from "../../UI/FormField.js";
import RadioBtn from "../../UI/RadioBtn.js";
import ClickButton from "../../UI/ClickButton.js";
import { validateField } from "../../../utils/validator.js";
import FieldValidCheckMark from "../../UI/FieldValidCheckMark.js";
import { AuthContext } from "../../../contexts/AuthContext.js";
import { Redirect } from "react-router";

function Register({ history }) {
  const { user, register } = useContext(AuthContext);

  const [username, setUserName] = useState("");
  const [isValidName, setValidName] = useState(undefined);

  const [email, setEmail] = useState("");
  const [isValidEmail, setValidEmail] = useState(undefined);

  const [password, setPassword] = useState("");
  const [isValidPassword, setValidPassword] = useState(undefined);

  const [repeatPassword, setRepeatPassword] = useState("");
  const [isValidPassMatch, setValidPassMatch] = useState(undefined);

  const [accType, setAccType] = useState("personal");

  const submitHandler = (e) => {
    e.preventDefault();
    const cleanData = {
      username: username.trim(),
      email: email.trim(),
      password: password.trim(),
      accountType: accType.trim(),
      isPassMatch: isValidPassMatch,
    };

    register(cleanData)
      .then(() => history.push("/"))
      .catch((err) => alert(err));
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <section className={styles.registerSection}>
      <div className="info">
        <h2>To have one less care</h2>
      </div>
      <form onSubmit={submitHandler} className={styles.formClass}>
        <div className={styles.formFieldGroup}>
          <FormField
            label="Username"
            id="username"
            name="username"
            type="text"
            placeholder="username"
            value={username}
            onChange={setUserName}
            onInput={(e) => setValidName(validateField(e.target.value, /^[a-z]{3,}$/i))}
          />
          <FieldValidCheckMark
            isValid={isValidName}
            text="Username must be at least 3 long. No special characters allowed."
          />
        </div>
        <div className={styles.formFieldGroup}>
          <FormField
            label="Email"
            id="email"
            name="email"
            type="email"
            placeholder="email_12@domain.com"
            value={email}
            onChange={setEmail}
            onInput={(e) =>
              setValidEmail(validateField(e.target.value, /^\w+@{1}\w+\.{1}[a-z]{2,3}$/i))
            }
          />
          <FieldValidCheckMark
            isValid={isValidEmail}
            text="Email must be valid to mailbox@domain.bg/com"
          />
        </div>
        <div className={styles.formFieldGroup}>
          <FormField
            label="Password"
            id="password"
            name="password"
            type="password"
            value={password}
            placeholder="password"
            onChange={setPassword}
            onInput={(e) => setValidPassword(validateField(e.target.value, /^.{6,}$/i))}
          />
          <FieldValidCheckMark
            isValid={isValidPassword}
            text="Password must be at least 6 chars long"
          />
        </div>
        <div className={styles.formFieldGroup}>
          <FormField
            label="Repeat password"
            id="repeatPassword"
            name="repeatPassword"
            type="password"
            value={repeatPassword}
            placeholder="repeat password"
            onChange={setRepeatPassword}
            onInput={(e) => setValidPassMatch(e.target.value === password)}
          />
          <FieldValidCheckMark isValid={isValidPassMatch} text="Passwords do not match" />
        </div>
        <RadioBtn
          label="Business account"
          id="Business"
          name="accountType"
          type="radio"
          value="business"
          checked={accType === "business"}
          onChange={setAccType}
        />
        <RadioBtn
          label="Personal account"
          id="Personal"
          name="accountType"
          type="radio"
          value="personal"
          checked={accType === "personal"}
          onChange={setAccType}
        />
        <div className={styles.formFieldGroup}>
          <ClickButton
            label="Register"
            disabled={
              !(isValidName && isValidEmail && isValidPassword && isValidPassMatch && accType)
            }
          />
        </div>
      </form>
    </section>
  );
}

export default Register;
