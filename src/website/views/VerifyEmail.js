import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import verifyEmailImg from "../../shared/assets/verify_email.png";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ImgCardBg from "../../shared/components/ImgCardBg";
import "./VerifyEmail.css";

const VerifyEmail = () => {
  const route = useParams().route;
  const email = useParams().email;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [seconds, setSeconds] = useState(route === "login" ? 0 : 30);

  const resendEmailHandler = async () => {
    setSeconds(30);
    try {
      await sendRequest(`user/resend_verification_email/${email}`);
    } catch (err) {
      setSeconds(0);
    }
  };

  useEffect(() => {
    if (seconds > 0) setTimeout(() => setSeconds(seconds - 1), 1000);
  }, [seconds]);

  return (
    <ImgCardBg size="sm">
      <div className="d-flex flex-column align-items-center text-center py-3">
        <div className="col-md-12">
          <img src={verifyEmailImg} width="70%" />
        </div>
        <h5 className="thank-you-text">Thank you for signing up</h5>
        <p className="verify-email-text px-5 mb-1">
          Your account is created, a verification link is sent to your email
          please verify your email to
          <Link to="/auth"> login to your Dashboard.</Link>
        </p>
        {seconds ? (
          <div className="email-coutndown mb-3">
            <p className="text-dark font-weight-bold mb-1">Resend email in</p>
            <h3 className="countdown-text">{seconds}</h3>
            <LoadingSpinner color="info" />
          </div>
        ) : (
          <button
            className="btn-outline-info resend-email-btn btn mt-3"
            onClick={resendEmailHandler}
          >
            Resend Email
          </button>
        )}
      </div>
    </ImgCardBg>
  );
};

export default VerifyEmail;
