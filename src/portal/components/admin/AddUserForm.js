import React, { useEffect, useState } from "react";

import {
  validate,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/utils/validators";
import { onlyAlphabet } from "../../../shared/utils/functions";
import Input from "../../../shared/components/Input";
import "./AddUserForm.css";

const AddUserForm = ({ signupInput, setSignupInput }) => {
  const [signupInputErr, setSignupInputErr] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const setState = (event) => {
    if (event.target.id == "name") {
      if (!validate(event.target.value, [VALIDATOR_REQUIRE()])) {
        setSignupInputErr({ ...signupInputErr, name: "Name is required!" });
      } else {
        setSignupInputErr({ ...signupInputErr, name: "" });
      }
      setSignupInput({
        ...signupInput,
        name: onlyAlphabet(event.target.value),
      });
    }

    if (event.target.id == "email") {
      if (!validate(event.target.value, [VALIDATOR_EMAIL()])) {
        setSignupInputErr({
          ...signupInputErr,
          email: "Please write a valid email!",
        });
      } else {
        setSignupInputErr({ ...signupInputErr, email: "" });
      }
      setSignupInput({ ...signupInput, email: event.target.value });
    }

    if (event.target.id == "password") {
      if (!validate(event.target.value, [VALIDATOR_MINLENGTH(8)])) {
        setSignupInputErr({
          ...signupInputErr,
          password: "Password should be 8 characters.",
        });
      } else {
        setSignupInputErr({
          ...signupInputErr,
          password: "",
        });
      }
      setSignupInput({ ...signupInput, password: event.target.value });
    }

    if (event.target.id === "admin" || event.target.id === "employee")
      setSignupInput({ ...signupInput, role: event.target.id });
  };

  useEffect(() => {
    console.log(signupInput);
  }, [signupInput]);

  return (
    <form className="form-fields px-4 py-1">
      <div>
        <Input
          id="name"
          type="text"
          label="Full Name"
          value={signupInput.name}
          onChange={setState}
          error={signupInputErr.name}
        />
      </div>
      <div className="mt-2">
        <Input
          id="email"
          type="email"
          label="Email Address"
          value={signupInput.email}
          onChange={setState}
          error={signupInputErr.email}
        />
      </div>
      <div className="mt-2">
        <Input
          id="password"
          type="Password"
          label="Password"
          value={signupInput.password}
          onChange={setState}
          error={signupInputErr.password}
        />
      </div>
      <div className="role-radio-btns p-2 mt-2">
        <p>Role:</p>
        <label className="role-radio-container">
          Employee
          <input
            type="radio"
            id="employee"
            onChange={setState}
            onClick={setState}
            name="role"
          />
          <span className="checkmark"></span>
        </label>
        <label className="role-radio-container">
          Admin
          <input
            type="radio"
            id="admin"
            onChange={setState}
            onClick={setState}
            name="role"
          />
          <span className="checkmark"></span>
        </label>
      </div>
    </form>
  );
};

export default AddUserForm;
