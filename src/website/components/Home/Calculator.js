import React, { useEffect, useState } from "react";
import { IoSendSharp, IoArrowBack } from "react-icons/io5";
import { BiReset } from "react-icons/bi";

import { validate, VALIDATOR_EMAIL } from "../../../shared/utils/validators";
import {
  isObjEmpty,
  shipmentModeName,
  notNegative,
  setDecimalPoints,
} from "../../../shared/utils/functions";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";

import "./Calculator.css";

const Calculator = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [calculatorState, setCalculatorState] = useState(props.mode ? 3 : 1);
  const [shipmentMode, setShipmentMode] = useState(
    props.mode ? props.mode : ""
  );
  const [clientEmail, setClientEmail] = useState("");
  const [error2, setError2] = useState("");
  const [success, setSuccess] = useState("");

  const quotationInputFormat = {
    weight: "",
    weightUnit: "kgs",
    length: "",
    width: "",
    height: "",
    mode: shipmentMode,
  };

  const quotationResponseFormat = {
    length: "",
    width: "",
    height: "",
    actualWeight: "",
    volumetricWeight: "",
    weightUnit: "",
    mode: "",
    handlingFee: "",
    totalPrice: "",
  };

  const [quotationForm, setQuotationForm] = useState(quotationInputFormat);
  const [quotationResponse, setQuotationResponse] = useState(
    quotationResponseFormat
  );

  const clearMessagesHanlder = () => {
    setError2("");
    clearError();
    setSuccess("");
  };

  const getQuotationApi = async (data) => {
    data.mode = shipmentModeName(data.mode);
    try {
      const response = await sendRequest("get_quotation", "POST", data);
      setQuotationResponse(response.data);
      setQuotationForm(quotationInputFormat);
    } catch (error) {}
  };

  const sendQuotationApi = async (data) => {
    try {
      const response = await sendRequest("email_quotation", "POST", data);
      setSuccess(response.data.message);
      console.log(response);
      setError2("");
    } catch (error) {}
  };

  const previousStateHandler = () => {
    setCalculatorState(calculatorState - 1);
  };

  const firstStateHandler = () => {
    setCalculatorState(2);
    // signupApi();
  };

  const secondStateHandler = (mode) => {
    setCalculatorState(3);
    setShipmentMode(mode);
    setQuotationForm({
      ...quotationForm,
      mode: mode === "AIR" ? "PLANE" : "SHIP",
    });
  };

  const thirdStateHandler = (event) => {
    event.preventDefault();
    if (!isObjEmpty(quotationForm)) {
      setError2({ message: "Please fill all the fields first." });
      return;
    }

    setError2("");
    setCalculatorState(4);
    getQuotationApi(quotationForm);
    setQuotationForm(quotationInputFormat);
  };

  const fourthStateHandler = (event) => {
    event.preventDefault();
    setCalculatorState(5);
  };

  const sendEmailHandler = (event) => {
    event.preventDefault();
    if (!isObjEmpty(quotationResponse) || clientEmail == "")
      setError2({ message: "Please fill all the fields first." });
    else if (!validate(clientEmail, [VALIDATOR_EMAIL()]))
      setError2({ message: "Please write a valid email." });
    else sendQuotationApi({ email: clientEmail, quotation: quotationResponse });
  };

  useEffect(() => {
    clearMessagesHanlder();
  }, [calculatorState]);

  return (
    <div className="d-flex flex-column align-items-center">
      {isLoading && (
        <div className="mb-3">
          <LoadingSpinner color="white" small />
        </div>
      )}
      {error ||
        (error2 && (
          <div className="bg-white text-danger px-1 mb-2">
            <h5 className="m-0">{error?.data?.message || error2.message}</h5>
          </div>
        ))}
      {success && (
        <div className="bg-white text-success px-1 mb-2">
          <h5 className="m-0">{success}</h5>
        </div>
      )}
      <div
        className={`calculator-section ${props.red ? "red " : ""}${
          props.className
        }`}
      >
        {/* FIRST STATE */}
        <button
          className={`${
            props.red ? "red " : ""
          }quote-btn font-weight-bold mx-auto ${
            calculatorState === 1 ? "active" : "inactive"
          }`}
          onClick={firstStateHandler}
        >
          GET A QUOTE
        </button>

        {/* SECOND STATE */}

        {props.mode && calculatorState === 3 ? (
          <React.Fragment></React.Fragment>
        ) : (
          calculatorState > 1 && (
            <button
              className={`${props.red ? "red " : ""}reset-btn`}
              onClick={previousStateHandler}
            >
              <IoArrowBack size={20} className="text-danger" />
            </button>
          )
        )}
        <div
          className={`${props.red ? "red " : ""}get-quote-btns ${
            calculatorState === 2 ? "active" : "inactive"
          }`}
        >
          <button className={`get-quote-text`}>GET A QUOTE</button>
          <button
            className={`by-plane-btn`}
            onClick={() => secondStateHandler("AIR")}
          >
            BY AIR
          </button>
          <button
            className={`by-ship-btn`}
            onClick={() => secondStateHandler("SEA")}
          >
            BY SEA
          </button>
        </div>

        {/* THIRD STATE */}
        <form
          className={`${props.red ? "red " : ""}calculate-form mx-auto ${
            calculatorState === 3 ? "active" : "inactive"
          }`}
        >
          <input
            className={`weight-input`}
            type="number"
            id="shipment-weight"
            min="0"
            placeholder="Weight in kgs"
            value={quotationForm.weight}
            onChange={(e) =>
              setQuotationForm({
                ...quotationForm,
                weight: notNegative(e.target.value),
              })
            }
          />
          <select
            className="weight-unit-select d-none"
            onChange={(e) =>
              setQuotationForm({ ...quotationForm, weightUnit: e.target.value })
            }
          >
            <option value="kgs">Unit</option>
            <option value="kgs">kgs</option>
            <option value="lbs">lbs</option>
          </select>
          <input
            className={`length-input`}
            type="number"
            min="0"
            id="shipment-length"
            placeholder="Length in cm"
            value={quotationForm.length}
            onChange={(e) =>
              setQuotationForm({
                ...quotationForm,
                length: notNegative(e.target.value),
              })
            }
          />
          <input
            className={`width-input`}
            type="number"
            min="0"
            id="shipment-width"
            placeholder="Width in cm"
            value={quotationForm.width}
            onChange={(e) =>
              setQuotationForm({
                ...quotationForm,
                width: notNegative(e.target.value),
              })
            }
          />
          <input
            className={`height-input`}
            type="number"
            min="0"
            id="shipment-height"
            placeholder="Height in cm"
            value={quotationForm.height}
            onChange={(e) =>
              setQuotationForm({
                ...quotationForm,
                height: notNegative(e.target.value),
              })
            }
          />
          <button
            type="submit"
            className={`submit-btn`}
            onClick={thirdStateHandler}
          >
            BY {shipmentMode} QUOTE
          </button>
        </form>

        {/* FOURTH STATE */}

        <div className="d-flex flex-column align-items-center">
          <div
            className={`${props.red ? "red " : ""}calculator-response mx-auto ${
              calculatorState === 4 || calculatorState === 5
                ? "active"
                : "inactive"
            }`}
          >
            <div className="input-pos-relative">
              <input
                className="actual-weight"
                type="number"
                id="shipment-length"
                value={setDecimalPoints(quotationResponse.actualWeight, 2)}
                readOnly
              />
              <label>
                Actual
                <br />
                Weight
              </label>
            </div>
            <div className="input-pos-relative">
              <input
                className="volumetric-weight"
                type="number"
                id="shipment-width"
                value={setDecimalPoints(quotationResponse.volumetricWeight, 2)}
                readOnly
              />
              <label>
                Volumetric
                <br />
                Weight
              </label>
            </div>
            <div className="input-pos-relative">
              <input
                className="total-cost font-weight-bold"
                type="number"
                id="shipment-height"
                value={setDecimalPoints(quotationResponse.totalPrice, 2)}
                readOnly
              />
              <label>
                Total
                <br />
                Cost
              </label>
              <button className={`email-btn`} onClick={fourthStateHandler}>
                EMAIL ME
              </button>
            </div>
          </div>
          <div
            className={`${props.red ? "red " : ""}email-input ${
              calculatorState === 5 ? "active" : "inactive"
            }`}
          >
            <div className="d-flex mt-2">
              <input
                type="email"
                className=""
                placeholder="Write your Email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="send-email-btn"
                onClick={sendEmailHandler}
              >
                Send
                <IoSendSharp size={15} />
              </button>
              <button
                className={`${props.red ? "red " : ""}reset-btn`}
                onClick={() => {
                  setSuccess("");
                  setError2("");
                  clearError();
                  setCalculatorState(props.mode ? 3 : 1);
                }}
              >
                <BiReset size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
