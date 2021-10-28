import React, { useState } from "react";
import { MdDoneAll } from "react-icons/md";

import { useHttpClient } from "../../../shared/hooks/http-hook";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";
import newsletterVideo from "../../../shared/assets/video.mp4";
import videoThumbnail from "../../../shared/assets/video-thumbnail.jpg";
import "./Newsletter.css";
import { useEffect } from "react";

const Newsletter = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [email, setEmail] = useState("");
  const [errorText, setErrorText] = useState("");
  const [success, setSuccess] = useState("12");

  const submitNewsletterApi = async (event) => {
    event.preventDefault();
    clearError();
    setSuccess("");
    setErrorText("");
    try {
      const response = await sendRequest(`subscribe_newsletter`, "POST", {
        timestamp: new Date(),
        email,
      });
      console.log(response);
      setSuccess(`( ${response.data.email} ) subscribed.`);
    } catch (err) {
      setErrorText(err.message);
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => setSuccess(""), 3000);
    }
  }, [success]);

  return (
    <section className="newsletter-section" id="newsletterSection">
      <div className="container">
        <div className="row">
          <div className="col-md-6 pr-md-0">
            <div className="search-info">
              <div>
                <h1>NEWSLETTER</h1>
                <p>
                  To receive messages with latest updates on when and where
                  collections are taking place as well as shipping news please
                  provide your e-mail address:
                </p>
              </div>
              {(error || errorText) && (
                <p className="badge badge-danger pt-0 pb-1">
                  <small>{error?.data?.message || errorText}</small>
                </p>
              )}
              {success && (
                <p className="badge badge-danger pt-0 pb-1">
                  <small>{success}</small>
                </p>
              )}
              <div className="row w-100">
                <div className="col-md-9 col-sm-12 pt-2 p-0">
                  <input
                    type="text"
                    className="w-100"
                    style={{ outline: "none" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                  />
                </div>
                <div className="col-md-3 col-sm-12 pt-2">
                  <button
                    className="h-100 btn btn-danger rounded-pill px-3"
                    disabled={email ? false : true}
                    onClick={submitNewsletterApi}
                  >
                    {isLoading ? (
                      <LoadingSpinner xsmall color="white" />
                    ) : success ? (
                      <MdDoneAll size={22} className="mb-1" />
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 pl-md-0">
            <div className="video">
              <video controls preload="none" poster={videoThumbnail}>
                <source src={newsletterVideo} type="video/mp4"></source>
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
