import { useState } from "react";
import FormField from "../../UI/FormField.js";

function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(email, password);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submited");
  };

  return (
    <>
      <div className="info">
        <h2>Wellcome back</h2>
      </div>
      <form onSubmit={submitHandler}>
        <FormField
          id="email"
          label="Email"
          type="email"
          className="input"
          placeholder="email_12@domain.com"
          value={email}
          onChange={setEmail}
          onBlur={() => {
            console.log("Blurred -- time to validate");
          }}
        />
        <FormField
          id="password"
          label="Password"
          type="password"
          className="input"
          placeholder="password"
          value={password}
          onChange={setPassword}
          onBlur={() => {
            console.log("Blurred -- time to validate");
          }}
        />
        <button>Login</button>
      </form>
    </>
  );
}

export default Login;
