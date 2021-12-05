import { useLocation } from "react-router";

function RegisterService() {
  const { search } = useLocation();
  const itemName = new URLSearchParams(search).get("name");

  return (
    <section>
      <div>
        <form action="" method="post"></form>
        <h1>Register</h1>
        <h2>{itemName}</h2>
      </div>
    </section>
  );
}

export default RegisterService;
