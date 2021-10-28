import React, { useContext, useEffect, useState } from "react";
import { FaTruckLoading } from "react-icons/fa";

import { validate, VALIDATOR_REQUIRE } from "../../../shared/utils/validators";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import InnerHeadingFrame from "../Navigation/InnerHeadingFrame";
import CollectionUpdateItem from "../customer/CollectionUpdateItem";
import Modal from "../../../shared/components/Modal";
import Input from "../../../shared/components/Input";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";
import { AuthContext } from "../../../shared/context/auth-context";
import axios from "axios";
import "./CollectionUpdate.css";
import { AiOutlineConsoleSql } from "react-icons/ai";

const CollectionUpdate = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [collectionUpdate, setCollectionUpdate] = useState([]);
  const [collectionUpdateModal, setCollectionUpdateModal] = useState(false);
  const [searchBarInput, setSearchBarInput] = useState("");
  const [inputError, setInputError] = useState({
    address: "",
    postcode: "",
    timestamp: "",
  });
  const [collectionUpdateState, setCollectionUpdateState] = useState({
    address: "",
    postcode: "",
    timestamp: "",
  });
  const [postArr, setPostArr] = useState([]);
  const [postcodeApiErr, setPostcodeApiErr] = useState("");
  const [postcodeSearchLoading, setPostcodeSearchLoading] = useState(false);

  const searchBarInputHandler = (event) => {
    setSearchBarInput(event.target.value);
    if (event.target.value === "") getCollectionUpdateApi();
    setCollectionUpdate(
      collectionUpdate.filter((data) =>
        data?.postcode?.toString()?.includes(event.target.value)
      )
    );
  };

  const collectionUpdateModalHandler = () => {
    setCollectionUpdateModal((prevMode) => !prevMode);
    setPostcodeApiErr("");
    setCollectionUpdateState({
      address: "",
      postcode: "",
      timestamp: "",
    });
  };

  const updateCollectionModal = (id, postcode, timestamp, address) => {
    const date = new Date(timestamp);
    setCollectionUpdateState({
      id,
      postcode,
      timestamp: `${date.toISOString().split(":")[0]}:${
        date.toISOString().split(":")[1]
      }`,
      address,
    });
    setCollectionUpdateModal((prevMode) => !prevMode);
  };

  const setPostcodeAndAddressHandler = async (address, url) => {
    const response = await axios(
      `${process.env.REACT_APP_POSTCODE_API}${url}/?api-key=by3U2OzkAUmqhNyZSu7J5Q33106`
    );
    let postcode = response.data.postcode;
    setCollectionUpdateState({ ...collectionUpdateState, address, postcode });
    setPostArr([]);
  };

  const updateCollectionUpdateApi = async () => {
    if (collectionUpdateState.postcode === "") {
      setInputError({ ...inputError, postcode: "Postcode is Required." });
      return;
    }
    setInputError({ ...inputError, postcode: "" });
    if (collectionUpdateState.timestamp === "") {
      setInputError({ ...inputError, timestamp: "Select Time." });
      return;
    }
    setInputError({ ...inputError, timestamp: "" });

    try {
      const response = await sendRequest(
        "collection_update/update_collection_update",
        "PATCH",
        collectionUpdateState
      );
      console.log(response);
      collectionUpdateModalHandler();
      getCollectionUpdateApi();
      setCollectionUpdateState({
        postcode: "",
        timestamp: "",
      });
    } catch (err) {}
  };

  const setState = (event) => {
    if (event.target.id === "postcode") {
      setCollectionUpdateState({
        ...collectionUpdateState,
        postcode: event.target.value,
      });
      if (validate(event.target.value, [VALIDATOR_REQUIRE()])) {
        setInputError({ ...inputError, postcode: "" });
      } else {
        setInputError({ ...inputError, postcode: "Postcode is Required." });
      }
    } else if (event.target.id === "address") {
      setCollectionUpdateState({
        ...collectionUpdateState,
        address: event.target.value,
      });
      if (validate(event.target.value, [VALIDATOR_REQUIRE()])) {
        setPostcodeApiErr("");
      } else {
        setPostcodeApiErr("Address is Required");
      }
      console.log(event.target.value);
    } else {
      setCollectionUpdateState({
        ...collectionUpdateState,
        timestamp: event.target.value,
      });
      if (validate(event.target.value, [VALIDATOR_REQUIRE()])) {
        setInputError({ ...inputError, timestamp: "" });
      } else {
        setInputError({ ...inputError, timestamp: "Select Time." });
      }
    }
    console.log(collectionUpdateState);
  };

  const getCollectionUpdateApi = async () => {
    try {
      const response = await sendRequest(
        "collection_update/get_active_collection_update"
      );
      setCollectionUpdate(response.data.distinctPostcode);
      console.log(response.data.distinctPostcode);
    } catch (err) {}
  };

  const createCollectionUpdateApi = async () => {
    if (collectionUpdateState.postcode === "") {
      setInputError({ ...inputError, postcode: "Postcode is Required." });
      return;
    }
    setInputError({ ...inputError, postcode: "" });
    if (collectionUpdateState.timestamp === "") {
      setInputError({ ...inputError, timestamp: "Select Time." });
      return;
    }
    setInputError({ ...inputError, timestamp: "" });

    try {
      const response = await sendRequest(
        "collection_update/create_collection_update",
        "POST",
        collectionUpdateState
      );
      console.log(response);
      collectionUpdateModalHandler();
      getCollectionUpdateApi();
      setCollectionUpdateState({
        postcode: "",
        timestamp: "",
      });
    } catch (err) {}
  };

  const getPostAddressApi = async () => {
    setPostcodeApiErr("");
    if (!collectionUpdateState.address)
      return setPostcodeApiErr("Please Enter Address");
    setPostcodeSearchLoading(true);
    try {
      const response = await axios(
        // `${process.env.REACT_APP_POSTCODE_API}search?text=${collectionUpdateState.address}&apiKey=9659fa42d6a842c6ab0d8911a4dea90b`
        `${process.env.REACT_APP_ADDRESS_API}${collectionUpdateState.address}/?api-key=by3U2OzkAUmqhNyZSu7J5Q33106`
      );
      console.log(response.data.suggestions);
      setPostArr(response.data.suggestions);
      console.log(postArr);
      setPostcodeSearchLoading(false);
    } catch (err) {
      console.log(err.message);
      setPostcodeSearchLoading(false);
    }
  };

  useEffect(() => {
    getCollectionUpdateApi();
  }, []);

  return (
    <React.Fragment>
      <InnerHeadingFrame
        heading="Collection Update"
        icon={<FaTruckLoading size={35} className="mt-2 mr-1" />}
        loading={isLoading}
      >
        <div className="d-flex justify-content-end px-2 mt-3">
          <input
            type="text"
            className="list-search-bar shadow"
            placeholder="Search Postcode"
            value={searchBarInput}
            onChange={searchBarInputHandler}
          />
          {(auth.role === "employee" || auth.role === "admin") && (
            <button
              className="btn info-gradient-btn shadow"
              onClick={collectionUpdateModalHandler}
            >
              Add New
            </button>
          )}
        </div>
        <div className="row px-2">
          {collectionUpdate?.map((data, index) => (
            <CollectionUpdateItem
              key={index}
              data={data}
              openUpdateModal={updateCollectionModal}
            />
          ))}
        </div>
      </InnerHeadingFrame>

      <Modal
        show={collectionUpdateModal}
        onCancel={collectionUpdateModalHandler}
        footerContent={
          <React.Fragment>
            <button
              className="btn btn-light"
              onClick={collectionUpdateModalHandler}
            >
              Close
            </button>
            {collectionUpdateState.id ? (
              <button
                className="btn btn-primary ml-2"
                onClick={updateCollectionUpdateApi}
              >
                {isLoading ? <LoadingSpinner xsmall color="white" /> : "Update"}
              </button>
            ) : (
              <button
                className="btn btn-primary ml-2"
                onClick={createCollectionUpdateApi}
              >
                {isLoading ? <LoadingSpinner xsmall color="white" /> : "Add"}
              </button>
            )}
          </React.Fragment>
        }
      >
        <div className="px-3 pt-2">
          <div className="postcode-search-section">
            <Input
              element="input"
              type="text"
              id="address"
              label="Address"
              value={collectionUpdateState.address}
              onChange={setState}
              error={inputError.postcode}
              autoComplete="off"
              error={postcodeApiErr}
            />
            <button className="btn btn-primary" onClick={getPostAddressApi}>
              {postcodeSearchLoading ? (
                <LoadingSpinner xsmall color="white" />
              ) : (
                "Search"
              )}
            </button>
            {postArr.length !== 0 && (
              <div className="postcode-list">
                {postArr?.map((items, index) => {
                  console.log(items.address);
                  return (
                    items.address && (
                      <button
                        key={index}
                        onClick={() =>
                          setPostcodeAndAddressHandler(items.address, items.url)
                        }
                      >
                        <span className="font-weight-bold">
                          Postcode: {items.address}
                        </span>
                        {/* <span>
                          <small>{items.properties.formatted}</small>
                        </span> */}
                      </button>
                    )
                  );
                })}
              </div>
            )}
          </div>
          {postcodeApiErr && (
            <p className="text-danger px-2">{postcodeApiErr}</p>
          )}

          <Input
            element="input"
            type="text"
            id="postcode"
            label="Postcode"
            value={collectionUpdateState.postcode}
            onChange={setState}
            readOnly
            error={inputError.postcode}
          />
          <Input
            element="input"
            type="datetime-local"
            id="time"
            value={collectionUpdateState.timestamp}
            onChange={setState}
            error={inputError.timestamp}
          />
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default CollectionUpdate;
