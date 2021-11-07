import { useState } from "react";
import FormField from "../../UI/FormField.js";
import RadioBtn from "../../UI/RadioBtn.js";

function Register({ history }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [accType, setAccType] = useState("person");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submited", accType);
  };
  return (
    <>
      <div className="info">
        <h2>To have one less care</h2>
      </div>
      <form onSubmit={submitHandler}>
        <FormField
          label="Username"
          id="userName"
          name="userName"
          type="text"
          placeholder="username"
          value={userName}
          onChange={setUserName}
          onBlur={() => {
            console.log("Blurred -- time to validate");
          }}
        />
        <FormField
          label="Email"
          id="email"
          name="email"
          type="email"
          placeholder="email_12@domain.com"
          value={email}
          onChange={setEmail}
          onBlur={() => {
            console.log("Blurred -- time to validate");
          }}
        />
        <FormField
          label="Password"
          id="password"
          name="password"
          type="password"
          value={password}
          placeholder="password"
          onChange={setPassword}
          onBlur={() => {
            console.log("Blurred -- time to validate");
          }}
        />
        <FormField
          label="Repeat password"
          id="repeatPassword"
          name="repeatPassword"
          type="password"
          value={repeatPassword}
          placeholder="repeat password"
          onChange={setRepeatPassword}
          onBlur={() => {
            console.log("Blurred -- time to validate");
          }}
        />
        <RadioBtn
          label="Business"
          id="Business"
          name="accountType"
          type="radio"
          value="business"
          checked={accType === "business"}
          onChange={setAccType}
        />
        <RadioBtn
          label="Personal"
          id="Personal"
          name="accountType"
          type="radio"
          value="personal"
          checked={accType === "person"}
          onChange={setAccType}
        />

        <button>Register</button>
      </form>
    </>
  );
}

export default Register;
