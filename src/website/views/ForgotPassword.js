import React, { useState } from "react";
import { Link } from "react-router-dom";

import ImgCardBg from "../../shared/components/ImgCardBg";
import Input from "../../shared/components/Input";
import logo from "../../shared/assets/logo.png";
import { validate, VALIDATOR_EMAIL } from "../../shared/utils/validators";
import { isObjEmpty } from "../../shared/utils/functions";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [forgotError, setForgotError] = useState({
    emailErr: "",
    emailFieldErr: "",
  });
  const [success, setSuccess] = useState("");
  const [forgotPassword, setForgotPassword] = useState({
    email: "",
  });

  const forgotHandler = (e) => {
    console.log(e.target.value);
    console.log(e.target.id);
    if (e.target.id == "email") {
      if (!validate(e.target.value, [VALIDATOR_EMAIL()])) {
        setForgotError({
          ...forgotError,
          emailErr: "Please write a valid email.!",
        });
      } else {
        setForgotError({ ...forgotError, emailErr: "" });
      }
      setForgotPassword({ ...forgotPassword, email: e.target.value });
    }
  };

  const forgetPasswordApi = async (event) => {
    event.preventDefault();
    if (!isObjEmpty(forgotPassword)) {
      setForgotError({
        ...forgotError,
        emailFieldErr: "Email field is required!",
      });
      return;
    }
    setForgotError({
      emailErr: "",
      emailFieldErr: "",
    });
    try {
      const response = await sendRequest(
        `user/forgot_password/${forgotPassword.email}`
      );
      setForgotPassword({ email: "" });
      setSuccess(response.data.success);
    } catch (error) {
      setForgotError({
        ...forgotError,
        emailFieldErr: error.response.data.message,
      });
    }
  };

  return (
    <div className="text-center">
      <ImgCardBg size="sm">
        <form className="w-100">
          <Link to="/">
            <img src={logo} />
          </Link>
          {forgotError.emailFieldErr && (
            <p className="text-danger">{forgotError.emailFieldErr}</p>
          )}
          {success && <p className="text-success">{success}</p>}
          <p
            className="text-muted"
            style={{ fontSize: "14px", marginTop: "5px" }}
          >
            Write your email address for which you want to
            <br />
            update the password.
          </p>
          <div className="forgot-input">
            <Input
              id="email"
              type="email"
              label="Email Address"
              value={forgotPassword.email}
              onChange={forgotHandler}
              error={forgotError.emailErr}
            />
            <button
              className="btn w-100 info-gradient-btn font-weight-bold mt-3"
              onClick={forgetPasswordApi}
            >
              {isLoading ? <LoadingSpinner xsmall color="white" /> : "SEND"}
            </button>
          </div>
        </form>
      </ImgCardBg>
    </div>
  );
};

export default ForgotPassword;
