import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { isObjEmpty } from "../../../shared/utils/functions";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";
import "./FindPostCode.css";

const FindPostCode = () => {
  const { sendRequest, isLoading } = useHttpClient();
  const [postArr, setPostArr] = useState([]);
  const [post, setPostCode] = useState({
    postCode: "",
  });

  const [postError, setPostError] = useState("");

  const submitPostCode = async (e) => {
    e.preventDefault();
    if (!isObjEmpty(post)) {
      setPostError("Please fill the post code!");
      return;
    }

    try {
      const response = await sendRequest(
        `collection_update/search_postcode`,
        "POST",
        {
          postcode: post.postCode,
        }
      );
      setPostArr(response.data);
      setPostCode({
        postCode: "",
      });
      setPostError("");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <section className="container mb-2">
      <div className="row pt-5 pb-3 justify-content-center">
        <p className="text-center code-reject">
          "Unfortunately we don't accept direct orders from Scotland at the
          moment, please contact +44 (0) 1582 561 029 if you wish to ship from
          Scotland."
        </p>
        {postError && (
          <div className="col-md-12">
            <p className="text-danger">{postError}</p>
          </div>
        )}
        <div className="postcode-input-wrapper">
          <input
            type="text"
            placeholder="Enter Postcode"
            className="input-group post-input"
            value={post.postCode}
            onChange={(e) =>
              setPostCode({
                postCode: e.target.value,
              })
            }
          />

          <button className="btn find-btn" onClick={submitPostCode}>
            {isLoading ? (
              <LoadingSpinner color="white" small />
            ) : (
              <BiSearchAlt size={20} />
            )}
          </button>
        </div>
      </div>
      {postArr &&
        postArr.map((items, index) => {
          return (
            items && (
              <p key={index} className="text-center post-text">
                {index === 0 && (
                  <React.Fragment>
                    We, are coming in your area <br />
                    <span className="font-weight-bold">{items.address}</span>
                    <span className="text-secondary font-weight-bold">
                      {" "}
                      {items.postcode}
                    </span>{" "}
                    on
                    <br />
                  </React.Fragment>
                )}
                <span className="text-danger font-weight-bold">
                  {items.timestamp?.split("T")[0]}
                  {` ${items.timestamp?.split("T")[1]?.split(":")[0]}:${
                    items.timestamp?.split("T")[1]?.split(":")[1]
                  } `}
                </span>
              </p>
            )
          );
        })}
    </section>
  );
};

export default FindPostCode;
