import React, { useContext, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaBoxes } from "react-icons/fa";
import { MdDoneAll } from "react-icons/md";
import { BsArrowDown } from "react-icons/bs";

import {
  validate,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/utils/validators.js";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import {
  isObjEmpty,
  notNegative,
  onlyAlphabet,
  notDecimalPoints,
} from "../../../shared/utils/functions";
import InnerHeadingFrame from "../Navigation/InnerHeadingFrame";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";
import AlertBar from "../../../shared/components/AlertBar";
import Input from "../../../shared/components/Input";
import Card from "../../../shared/components/Card";
import Toast from "../../../shared/components/Toast";
import "./BuyNShipForm.css";
import SelectCard from "../../../shared/components/SelectCard.js";

const ShipmentForm = () => {
  const auth = useContext(AuthContext);
  const initialShipmentInput = {
    placeOfTransaction: "UK",
    placeOfDestination: "Kenya",
    name: "",
    phoneNumber: "",
    address: "",
    city: "",
    email: "",
    item: [],
    employee: auth.userId,
    fragilePacking: [],
  };

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [errorText, setErrorText] = useState("");
  const [shipmentCreatedToast, setShipmentCreatedToast] = useState(false);
  const [itemError, setItemError] = useState("");
  const [shipmentInput, setShipmentInput] = useState(initialShipmentInput);
  const [packingProductsList, setPackingProductsList] = useState([]);
  const [formError, setFormError] = useState("");
  const [shipmentInputErr, setShipmentInputErr] = useState({
    emailErr: "",
    cityErr: "",
    addressErr: "",
    nameErr: "",
    phoneNumberErr: "",
  });

  const [itemObject, setItemObject] = useState({
    quantity: "",
    weight: "",
    weightUnit: "kgs",
    name: "",
    vendor: "",
    serialNumber: "",
    type: 3,
  });

  const setState = (event) => {
    if (event.target.id === "email") {
      if (validate(event.target.value, [VALIDATOR_EMAIL()])) {
        setShipmentInputErr({ ...shipmentInputErr, emailErr: "" });
      } else {
        setShipmentInputErr({
          ...shipmentInputErr,
          emailErr: "Please write a valid Email.",
        });
      }
      setShipmentInput({ ...shipmentInput, email: event.target.value });
    } else if (event.target.id === "name") {
      if (validate(event.target.value, [VALIDATOR_REQUIRE()])) {
        setShipmentInputErr({ ...shipmentInputErr, nameErr: "" });
      } else {
        setShipmentInputErr({
          ...shipmentInputErr,
          nameErr: "Name is Required.",
        });
      }
      setShipmentInput({
        ...shipmentInput,
        name: onlyAlphabet(event.target.value),
      });
    } else if (event.target.id === "phoneNumber") {
      if (validate(event.target.value, [VALIDATOR_REQUIRE()])) {
        setShipmentInputErr({ ...shipmentInputErr, phoneNumberErr: "" });
      } else {
        setShipmentInputErr({
          ...shipmentInputErr,
          phoneNumberErr: "Phone Number is Required.",
        });
      }
      setShipmentInput({ ...shipmentInput, phoneNumber: event.target.value });
    } else if (event.target.id === "address") {
      if (validate(event.target.value, [VALIDATOR_REQUIRE()])) {
        setShipmentInputErr({ ...shipmentInputErr, addressErr: "" });
      } else {
        setShipmentInputErr({
          ...shipmentInputErr,
          addressErr: "Address is Required.",
        });
      }
      setShipmentInput({ ...shipmentInput, address: event.target.value });
    } else {
      if (validate(event.target.value, [VALIDATOR_REQUIRE()])) {
        setShipmentInputErr({ ...shipmentInputErr, cityErr: "" });
      } else {
        setShipmentInputErr({
          ...shipmentInputErr,
          cityErr: "City is Required.",
        });
      }
      setShipmentInput({
        ...shipmentInput,
        city: onlyAlphabet(event.target.value),
      });
    }
  };

  const addItemHandler = () => {
    console.log(itemObject);
    console.log(isObjEmpty(itemObject));
    if (!isObjEmpty(itemObject)) {
      setItemError("Please fill out form fields.");
      return;
    }
    setItemError("");
    setShipmentInput({
      ...shipmentInput,
      item: [...shipmentInput.item, itemObject],
    });
    setItemObject({
      quantity: "",
      weight: "",
      weightUnit: "kgs",
      name: "",
      vendor: "",
      serialNumber: "",
      type: 3,
    });
    console.log(shipmentInput.item);
  };

  const deleteItemHandler = (delIndex) => {
    setShipmentInput({
      ...shipmentInput,
      item: shipmentInput.item.filter((data, index) => index !== delIndex),
    });
  };

  const createBuyNShipShipmentApi = async (event) => {
    setShipmentCreatedToast(false);
    if (!isObjEmpty(shipmentInput)) {
      setFormError("Please fill all the fields.");
      return;
    }
    if (shipmentInput.item.length === 0) {
      setFormError("Please add items to submit form.");
      return;
    }
    setFormError("");
    setErrorText("");

    event.preventDefault();
    try {
      await sendRequest(`shipment/create_buynship`, "POST", shipmentInput);
      setShipmentCreatedToast(true);
      setShipmentInput(initialShipmentInput);
    } catch (err) {
      setErrorText("Something went wrong, please try again");
      console.log(error);
    }
  };

  // FRAGILE PRODUCTS____________FUNCTIONS

  const getPackingProductsApi = async () => {
    const response = await sendRequest(`product/product_list/packing`);
    setPackingProductsList(response?.data?.products);
    setShipmentInput({
      ...shipmentInput,
      fragilePacking: response?.data?.products.map((data, index) => {
        return {
          id: data.id,
          name: data.name,
          price: data.price,
          quantity: 0,
          type: 4,
        };
      }),
    });
  };

  // FRAGILE PRODUCTS____________FUNCTIONS

  useEffect(() => {
    getPackingProductsApi();
  }, []);

  return (
    <InnerHeadingFrame
      icon={<FaBoxes className="mt-3" size={35} />}
      heading="Buy N Ship Form"
    >
      <Toast
        show={shipmentCreatedToast}
        setShow={setShipmentCreatedToast}
        closeBtn
        time="1500"
        icon={<MdDoneAll size={120} />}
        text="Shipment Created"
      />
      <Card>
        {/* {shipmentSuccessStatus && (
          <AlertBar
            color="success"
            icon={<MdDoneAll size={20} />}
            close={setShipmentSuccessStatus}
          >
            Shipment Created.
          </AlertBar>
        )} */}
        <div className="row my-5 mx-2">
          <div className="col-md-4">
            <Input
              label="Email Address"
              id="email"
              value={shipmentInput.email}
              onChange={setState}
              error={shipmentInputErr.emailErr}
            />
          </div>
          <div className="col-md-4">
            <Input
              label="Name"
              id="name"
              value={shipmentInput.name}
              onChange={setState}
              error={shipmentInputErr.nameErr}
            />
          </div>
          <div className="col-md-4">
            <Input
              label="Phone Number"
              id="phoneNumber"
              value={shipmentInput.phoneNumber}
              onChange={setState}
              error={shipmentInputErr.phoneNumberErr}
            />
          </div>
          <div className="col-md-4 mt-3">
            <Input
              label="City"
              id="city"
              value={shipmentInput.city}
              onChange={setState}
              error={shipmentInputErr.cityErr}
            />
          </div>
          <div className="col-md-4 mt-3">
            <Input
              label="Place of Transaction"
              value={shipmentInput.placeOfTransaction}
              onChange={(e) =>
                setShipmentInput({
                  ...shipmentInput,
                  placeOfTransaction: e.target.value,
                })
              }
              readOnly
            />
          </div>
          <div className="col-md-4 mt-3">
            <Input
              label="Place of Destination"
              value={shipmentInput.placeOfDestination}
              onChange={(e) =>
                setShipmentInput({
                  ...shipmentInput,
                  placeOfDestination: e.target.value,
                })
              }
              readOnly
            />
          </div>
          <div className="col-md-12 mt-3">
            <Input
              label="Address"
              id="address"
              value={shipmentInput.address}
              onChange={setState}
              error={shipmentInputErr.addressErr}
            />
          </div>

          <div className="col-md-12 mt-2">
            <div className="item-table-section border">
              {shipmentInput?.item?.length === 0 ? (
                <p
                  className="text-center m-0 pt-1 pb-3 font-weight-bold"
                  style={{ color: "rgb(176 176 176)" }}
                >
                  No Item Selected
                </p>
              ) : (
                <table className="shipment-items-table">
                  <thead>
                    <tr>
                      <th>Serial Number</th>
                      <th>Item/Description</th>
                      <th>Quantity</th>
                      <th>Weight</th>
                      <th>Vendor</th>
                      <th>Item Price</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {shipmentInput?.item?.map((data, index) => (
                      <tr key={index}>
                        <td>{data.serialNumber}</td>
                        <td>{data.name}</td>
                        <td>{data.quantity}</td>
                        <td>{`${data.weight} kg`}</td>
                        <td>{data.vendor}</td>
                        <td>{`£ ${data.itemPrice}`}</td>
                        <td className="d-flex justify-content-end">
                          <button
                            className="btn btn-danger px-2 d-flex align-items-center justify-content-center"
                            onClick={() => deleteItemHandler(index)}
                          >
                            <IoClose size={18} style={{ fill: "white" }} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <button
                className="item-collapse-btn"
                type="button"
                data-toggle="collapse"
                data-target="#addItemCollapse"
                aria-expanded="false"
                aria-controls="addItemCollapseLabel"
                onClick={() => setItemError("")}
              >
                <BsArrowDown size={25} className="text-dark" /> &nbsp; Add new
                item
              </button>
              <div className="collapse add-item-form" id="addItemCollapse">
                <div className="row">
                  <div className="col-4">
                    <Input
                      type="text"
                      label="Serial Number"
                      min="1"
                      value={itemObject.serialNumber}
                      onChange={(e) =>
                        setItemObject({
                          ...itemObject,
                          serialNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-4">
                    <Input
                      type="text"
                      label="Item Name"
                      min="1"
                      value={itemObject.name}
                      onChange={(e) =>
                        setItemObject({
                          ...itemObject,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-4">
                    <Input
                      type="number"
                      label="Quantity"
                      value={itemObject.quantity}
                      onChange={(e) =>
                        setItemObject({
                          ...itemObject,
                          quantity: notDecimalPoints(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="col-4">
                    <Input
                      type="number"
                      label="Weight in kgs"
                      min="1"
                      value={itemObject.weight}
                      onChange={(e) =>
                        setItemObject({
                          ...itemObject,
                          weight: notNegative(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="col-4">
                    <Input
                      type="text"
                      label="Vendor Name"
                      min="1"
                      value={itemObject.vendor}
                      onChange={(e) =>
                        setItemObject({
                          ...itemObject,
                          vendor: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="col-4">
                    <Input
                      type="number"
                      label="Item Price"
                      min="1"
                      value={itemObject.itemPrice}
                      onChange={(e) =>
                        setItemObject({
                          ...itemObject,
                          itemPrice: notNegative(e.target.value),
                        })
                      }
                    />
                  </div>
                  {itemError && (
                    <div className="col-md-12 text-center pt-3">
                      <p className="text-danger m-0 pl-3">{itemError}</p>
                    </div>
                  )}

                  <div className="pl-3 mt-4 d-flex align-items-center">
                    <button
                      className="btn btn-primary"
                      onClick={addItemHandler}
                    >
                      Add Item
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {formError && (
            <div className="col-md-12 text-center pt-3">
              <p className="text-danger" style={{ margin: 0 }}>
                {formError}
              </p>
            </div>
          )}

          <div className="input-group my-4 mx-3 justify-content-end">
            <div className="flex-column text-right">
              {errorText && <h6 className="text-danger">{errorText}</h6>}
              <button
                className="btn btn-primary"
                onClick={createBuyNShipShipmentApi}
              >
                {isLoading ? (
                  <LoadingSpinner xsmall color="white" />
                ) : (
                  "Submit Shipment Form"
                )}
              </button>
            </div>
          </div>
        </div>
      </Card>
    </InnerHeadingFrame>
  );
};
export default ShipmentForm;
