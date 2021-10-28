import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

import {
  validate,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../../shared/utils/validators";
import FormImg from "../../../shared/assets/FormImg.png";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import "./ContactForm.css";

const ContactForm = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [success, setSuccess] = useState("");
  const [sendMessageInput, setSendMessageInput] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sendMessageInputErr, setSendMessageInputErr] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const setState = (event) => {
    clearError();
    if (event.target.id === "name") {
      setSendMessageInput({ ...sendMessageInput, name: event.target.value });
      if (!validate(event.target.value, [VALIDATOR_REQUIRE()])) {
        setSendMessageInputErr({
          ...sendMessageInputErr,
          name: "Name is Required",
        });
      } else {
        setSendMessageInputErr({
          ...sendMessageInputErr,
          name: "",
        });
      }
    } else if (event.target.id === "email") {
      setSendMessageInput({ ...sendMessageInput, email: event.target.value });
      if (!validate(event.target.value, [VALIDATOR_EMAIL()])) {
        setSendMessageInputErr({
          ...sendMessageInputErr,
          email: "Email is Required",
        });
      } else {
        setSendMessageInputErr({
          ...sendMessageInputErr,
          email: "",
        });
      }
    } else if (event.target.id === "subject") {
      setSendMessageInput({ ...sendMessageInput, subject: event.target.value });
      if (!validate(event.target.value, [VALIDATOR_REQUIRE()])) {
        setSendMessageInputErr({
          ...sendMessageInputErr,
          subject: "Subject is Required",
        });
      } else {
        setSendMessageInputErr({
          ...sendMessageInputErr,
          subject: "",
        });
      }
    } else {
      setSendMessageInput({ ...sendMessageInput, message: event.target.value });
      if (!validate(event.target.value, [VALIDATOR_REQUIRE()])) {
        setSendMessageInputErr({
          ...sendMessageInputErr,
          message: "Message is Required",
        });
      } else {
        setSendMessageInputErr({
          ...sendMessageInputErr,
          message: "",
        });
      }
    }
  };

  const contactFormApi = async () => {
    try {
      const response = await sendRequest(
        `contact_us_email`,
        "POST",
        sendMessageInput
      );
      setSuccess(response.data.success);
      setSendMessageInput({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {}
  };

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <section className="contact-form-section" id="contactFormSection">
      <div className="container pb-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img src={FormImg} style={{ width: "100%" }} />
          </div>
          <div className="col-md-6">
            <div className="col-md-12">
              <h1>SEND A MESSAGE</h1>
            </div>
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-4 pr-md-0 form-detail">
                  <input
                    type="text"
                    id="name"
                    className={sendMessageInputErr.name && "error"}
                    placeholder="Name"
                    value={sendMessageInput.name}
                    onChange={setState}
                  />
                  <p>{sendMessageInputErr.name}</p>
                </div>
                <div className="col-md-4 pr-md-0 form-detail">
                  <input
                    type="Email"
                    id="email"
                    className={sendMessageInputErr.email && "error"}
                    placeholder="Email Address"
                    value={sendMessageInput.email}
                    onChange={setState}
                  />
                  <p>{sendMessageInputErr.email}</p>
                </div>
                <div className="col-md-4 form-detail">
                  <input
                    type="text"
                    id="subject"
                    className={sendMessageInputErr.subject && "error"}
                    placeholder="Subject"
                    value={sendMessageInput.subject}
                    onChange={setState}
                  />
                  <p>{sendMessageInputErr.subject}</p>
                </div>

                <div className="col-md-12 form-detail pt-1">
                  <textarea
                    id="message"
                    className={sendMessageInputErr.message && "error"}
                    rows="9"
                    cols="77"
                    placeholder="Write your message here..."
                    value={sendMessageInput.message}
                    onChange={setState}
                  ></textarea>
                  <p>{sendMessageInputErr.message}</p>
                </div>
              </div>
              {success ? (
                <p className="badge badge-success px-2 py-1">{success}</p>
              ) : error ? (
                <p className="text-danger">{error?.data?.message}</p>
              ) : (
                ""
              )}
              <div className="d-flex align-items-center">
                <button
                  className="arrow-hover-btn red mt-2"
                  onClick={contactFormApi}
                >
                  <span className="apply-btn-text red">SUBMIT</span>
                  <FaArrowRight siz={10} className="arrow-btn-icon red" />
                </button>
                {isLoading && (
                  <LoadingSpinner small className="ml-3 mt-1" color="info" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
