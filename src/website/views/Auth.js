import React, { useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";

import SignInImage from "../../shared/assets/auth.png";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import ImgCardBg from "../../shared/components/ImgCardBg";
import {
  validate,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import LogoImage from "../../shared/assets/logo.png";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import { isObjEmpty, onlyAlphabet } from "../../shared/utils/functions";
import Input from "../../shared/components/Input";
import "./Auth.css";

const Auth = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  
  const [loginState, setLoginState] = useState(true);
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [signUpError, setSignUpError] = useState({
    nameErr: "",
    signupUsernameErr: "",
    loginUsernameErr: "",
    emailErr: "",
    signupPasswordErr: "",
    loginPasswordErr: "",
    signupFieldsErr: "",
  });

  const changeHandler = (e) => {
    if (e.target.id == "name") {
      if (!validate(e.target.value, [VALIDATOR_REQUIRE()])) {
        setSignUpError({ ...signUpError, nameErr: "Name is required!" });
      } else {
        setSignUpError({ ...signUpError, nameErr: "" });
      }
      setSignupInput({ ...signupInput, name: onlyAlphabet(e.target.value) });
    }

    if (e.target.id == "email") {
      if (!validate(e.target.value, [VALIDATOR_EMAIL()])) {
        setSignUpError({
          ...signUpError,
          emailErr: "Please write a valid email.!",
        });
      } else {
        setSignUpError({ ...signUpError, emailErr: "" });
      }
      setSignupInput({ ...signupInput, email: e.target.value });
    }

    if (e.target.id == "password") {
      if (!loginState) {
        if (!validate(e.target.value, [VALIDATOR_MINLENGTH(8)])) {
          setSignUpError({
            ...signUpError,
            signupPasswordErr: "Password should be 8 characters",
          });
        } else {
          setSignUpError({
            ...signUpError,
            signupPasswordErr: "",
          });
        }
      } else {
        if (!validate(e.target.value, [VALIDATOR_REQUIRE()])) {
          setSignUpError({
            ...signUpError,
            loginPasswordErr: "Password is required!",
          });
        } else {
          setSignUpError({
            ...signUpError,
            loginPasswordErr: "",
          });
        }
      }

      setSignupInput({ ...signupInput, password: e.target.value });
    }
  };

  const loginFormHandler = () => {
    setLoginState((prevMode) => !prevMode);
    setSignUpError({
      nameErr: "",
      signupUsernameErr: "",
      loginUsernameErr: "",
      emailErr: "",
      signupPasswordErr: "",
      loginPasswordErr: "",
      signupFieldsErr: "",
    });
    setSignupInput({
      name: "",
      password: "",
      name: "",
    });
    clearError();
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    if (loginState) {
      if (!signupInput.email || !signupInput.password) {
        setSignUpError({
          ...signUpError,
          signupFieldsErr: "All fields are required!",
        });
        return;
      }
    } else {
      console.log(signupInput);
      if (!isObjEmpty(signupInput)) {
        setSignUpError({
          ...signUpError,
          signupFieldsErr: "All fields are required!",
        });
        return;
      }
    }

    setSignUpError({
      ...signUpError,
      signupFieldsErr: "",
    });

    clearError();
    try {
      if (loginState) {
        const response = await sendRequest("user/signin", "POST", {
          email: signupInput.email,
          password: signupInput.password,
        });
        auth.login(response.data);
        history.push("/dashboard");
      } else {
        signupInput.role = "customer";
        await sendRequest("user/signup", "POST", signupInput);
        setSignupInput({
          name: "",
          email: "",
          password: "",
        });
        history.push(`/verify-email/signup/${signupInput.email}`);
      }
    } catch (err) {
      if (err?.response?.status === 401) {
        history.push(`/verify-email/login/${signupInput.email}`);
      }
    }
  };

  return (
    <ImgCardBg size="md">
      <div className="col-md-6 col-lg-6 left-box">
        <div className="text-center">
          <Link to="/" className="col-md-12 log-img">
            <img src={LogoImage} className="auth-logo" />
          </Link>
          <p className="font-weight-bold h5 mt-2 mb-3">
            {loginState ? "Welcome Back" : "Register Yourself"}
          </p>

          {loginState ? (
            <div>
              {signUpError.signupFieldsErr && (
                <p className="text-danger">{signUpError.signupFieldsErr}</p>
              )}

              <form className="form-fields px-2">
                <Input
                  id="email"
                  label="Email Address"
                  type="text"
                  value={signupInput.email}
                  onChange={changeHandler}
                  error={signUpError.emailErr}
                />

                <Input
                  id="password"
                  label="Password"
                  type="Password"
                  value={signupInput.password}
                  onChange={changeHandler}
                  error={signUpError.loginPasswordErr}
                />

                <div className="form-checkbox">
                  <Link to="/forgot-password">
                    <p className="clear-password text-right">
                      Forgot password?
                    </p>
                  </Link>
                </div>

                <button
                  type="button"
                  className="btn info-gradient-btn w-100 mt-3"
                  onClick={formSubmitHandler}
                >
                  {isLoading ? (
                    <LoadingSpinner xsmall color="white" />
                  ) : (
                    <span className="auth-submit-txt">Login</span>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div>
              {signUpError.signupFieldsErr && (
                <p className="text-danger">{signUpError.signupFieldsErr}</p>
              )}

              <form className="form-fields px-2">
                <Input
                  id="name"
                  type="text"
                  label="Full Name"
                  value={signupInput.name}
                  onChange={changeHandler}
                  error={signUpError.nameErr}
                />
                {/* <Input
                  id="username"
                  type="text"
                  label="Username"
                  value={signupInput.username}
                  onChange={changeHandler}
                  error={signUpError.signupUsernameErr}
                /> */}
                <Input
                  id="email"
                  type="email"
                  label="Email Address"
                  value={signupInput.email}
                  onChange={changeHandler}
                  error={signUpError.emailErr}
                />
                <Input
                  id="password"
                  type="Password"
                  label="Password"
                  value={signupInput.password}
                  onChange={changeHandler}
                  error={signUpError.signupPasswordErr}
                />
                <button
                  type="button"
                  className="btn info-gradient-btn w-100 mt-3"
                  onClick={formSubmitHandler}
                >
                  {isLoading ? (
                    <LoadingSpinner xsmall color="white" />
                  ) : (
                    <span className="auth-submit-txt">Signup</span>
                  )}
                </button>
              </form>
            </div>
          )}

          {error && (
            <h6 className="text-danger pt-3">{error?.data?.message}</h6>
          )}
          <p className="pt-3">
            {loginState ? "Don't have an account?" : "Already have an account?"}
            <b>
              <a
                className="btn p-0 text-primary font-weight-bold pb-1 pl-1"
                onClick={loginFormHandler}
              >
                {loginState ? "SIGN UP" : "LOG IN"}
              </a>
            </b>
          </p>
        </div>
      </div>
      <div className="col-md-6 col-lg-6  right-box">
        <img
          src={SignInImage}
          alt="Login Image"
          className={loginState ? `login-image` : `signup-image`}
        />
      </div>
    </ImgCardBg>
  );
};

export default Auth;
