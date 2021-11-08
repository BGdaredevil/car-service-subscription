import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import styles from "./Register.module.css";

import FormField from "../../UI/FormField.js";
import RadioBtn from "../../UI/RadioBtn.js";
import ClickButton from "../../UI/ClickButton.js";
import { validateField } from "../../../utils/validator.js";

function Register({ history }) {
  const [userName, setUserName] = useState("");
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
    console.log("submited", accType);
  };
  return (
    <section className={styles.registerSection}>
      <div className="info">
        <h2>To have one less care</h2>
      </div>
      <form onSubmit={submitHandler} className={styles.formClass}>
        <div className={styles.formFieldGroup}>
          <FormField
            label="Username"
            id="userName"
            name="userName"
            type="text"
            placeholder="username"
            value={userName}
            onChange={setUserName}
            onBlur={(e) => setValidName(validateField(e.target.value, /^[a-z]{3,}$/i))}
          />
          {isValidName !== undefined ? (
            isValidName ? (
              <>
                <FontAwesomeIcon icon={faCheck} />
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faTimes} />
                <p>Username must be at least 3 long. No special characters allowed.</p>
              </>
            )
          ) : (
            ""
          )}
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
            onBlur={(e) =>
              setValidEmail(validateField(e.target.value, /^\w+@{1}\w+\.{1}[a-z]{2,3}$/i))
            }
          />
          {isValidEmail !== undefined ? (
            isValidEmail ? (
              <>
                <FontAwesomeIcon icon={faCheck} />
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faTimes} />
                <p>Email must be valid to mailbox@d omain.bg/com</p>
              </>
            )
          ) : (
            ""
          )}
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
            onBlur={(e) => setValidPassword(validateField(e.target.value, /^.{4,}$/i))}
          />
          {isValidPassword !== undefined ? (
            isValidPassword ? (
              <>
                <FontAwesomeIcon icon={faCheck} />
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faTimes} />
                <p>Password must be at least 4 chars long</p>
              </>
            )
          ) : (
            ""
          )}
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
            onBlur={() => setValidPassMatch(repeatPassword === password)}
          />
          {isValidPassMatch !== undefined ? (
            isValidPassMatch ? (
              <>
                <FontAwesomeIcon icon={faCheck} />
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faTimes} />
                <p>Passwords do not match</p>
              </>
            )
          ) : (
            ""
          )}
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
        <ClickButton label="Register" />
      </form>
    </section>
  );
}

export default Register;
