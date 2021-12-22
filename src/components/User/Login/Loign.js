import { useContext, useState } from "react";

import FormField from "../../UI/FormField.js";
import ClickButton from "../../UI/ClickButton.js";
import { validateField } from "../../../utils/validator.js";
import { AuthContext } from "../../../contexts/AuthContext.js";

function Login({ history }) {
  const { isAuth, login } = useContext(AuthContext);

  const [isValidEmail, setValidEmail] = useState(undefined);
  const [isValidPassword, setValidPassword] = useState(undefined);
  const [isSending, setIsSending] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const cleanData = {
      email: data.email.trim(),
      password: data.password.trim(),
    };
    setIsSending(true);
    login(cleanData)
      .then((r) => {
        // console.log(r);
        setIsSending(false);
        history.push("/");
      })
      .catch((err) => alert(err));
  };

  if (isAuth) {
    history.push("/");
    return null;
  }

  return (
    <section className="loginSection view">
      <div className="container">
        <div className="form-container">
          <div className="info">
            <h2>Wellcome back</h2>
          </div>
          <form className="formClass" onSubmit={submitHandler}>
            <FormField
              label="Email"
              type="text"
              placeholder="email_12@domain.com"
              name="email"
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
              type="password"
              placeholder="password"
              name="password"
              onInput={(e) => setValidPassword(validateField(e.target.value, /^.{6,}$/i))}
              className={[
                isValidPassword === false ? "invalid" : "",
                isValidPassword ? "valid" : "",
              ].join(" ")}
            />
            {isValidPassword === false ? (
              <p className="alarm-text">Password should be at least 6 chars long</p>
            ) : (
              ""
            )}
            <ClickButton
              label="Login"
              disabled={!(isValidEmail && isValidPassword && !isSending)}
            />
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
