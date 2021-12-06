import { useState } from "react";
import { endpoints } from "../../../config/apiConfig.js";
import { post } from "../../../services/apiService.js";
import { validateField } from "../../../utils/validator.js";
import ClickButton from "../../UI/ClickButton.js";
import FieldValidCheckMark from "../../UI/FieldValidCheckMark.js";
import FormField from "../../UI/FormField.js";

function RegisterService({ name, shopId }) {
  const [isValidPrice, setValidPrice] = useState(undefined);
  const [isValidDescription, setValidDescriptopn] = useState(undefined);

  const submitHandler = (e) => {
    e.preventDefault();
    const es = Object.fromEntries(new FormData(e.target));
    console.log(es);
    post(`${endpoints.serviceApi}`, {
      shopId,
      name: es.name.trim(),
      price: es.price.trim(),
      description: es.description.trim(),
    })
      .then((r) => console.log(r))
      .catch((e) => console.log(e));
  };

  return (
    <section>
      <div>
        <h1>Register</h1>
        <form action="/services" method="post" onSubmit={submitHandler}>
          <div className="">
            <FormField
              label="Name"
              type="text"
              placeholder="Name"
              name="name"
              defaultValue={name}
              readonly
            />
          </div>
          <div className="">
            <FormField
              label="Price"
              type="number"
              placeholder="Price"
              name="price"
              onInput={(e) => setValidPrice(validateField(e.target.value, /^[0-9]+$/i))}
            />
            <FieldValidCheckMark
              isValid={isValidPrice}
              text="Please input a price for your service"
            />
          </div>
          <div className="">
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              placeholder="Please describe your service"
              onInput={(e) => setValidDescriptopn(validateField(e.target.value, /.+/i))}
            ></textarea>
            <FieldValidCheckMark
              isValid={isValidDescription}
              text="Please input a description for your service"
            />
          </div>
          <ClickButton label="Register" type="submit" />
        </form>
      </div>
    </section>
  );
}

export default RegisterService;
