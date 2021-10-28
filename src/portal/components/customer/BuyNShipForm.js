import React, { useContext, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaBoxes } from "react-icons/fa";
import { MdDoneAll } from "react-icons/md";
import { BsArrowDown } from "react-icons/bs";

import { useHttpClient } from "../../../shared/hooks/http-hook";
import { AuthContext } from "../../../shared/context/auth-context";
import {
  isObjEmpty,
  onlyAlphabet,
  notDecimalPoints,
} from "../../../shared/utils/functions";
import InnerHeadingFrame from "../Navigation/InnerHeadingFrame";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";
import SelectCard from "../../../shared/components/SelectCard";
import Modal from "../../../shared/components/Modal";
import Toast from "../../../shared/components/Toast";
import Input from "../../../shared/components/Input";
import Card from "../../../shared/components/Card";
import "./ShipmentForm.css";

const BuyNShipForm = () => {
  const auth = useContext(AuthContext);
  const initialShipmentInput = {
    placeOfTransaction: "UK",
    placeOfDestination: "Kenya",
    courierType: "",
    receiver: "",
    user: auth.userId,
    item: [],
    fragilePacking: [],
  };

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [receiverList, setReceiverList] = useState([]);
  const [recipientToast, setRecipientToast] = useState(false);
  const [receiverError, setReceiverError] = useState("");
  const [recipientModal, setRecipientModal] = useState(false);
  const [shipmentSuccessStatus, setShipmentSuccessStatus] = useState(false);
  const [packingProductsList, setPackingProductsList] = useState([]);
  const [errorText, setErrorText] = useState("");
  const [receiverInput, setReceiverInput] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    city: "",
  });

  const [shipmentInput, setShipmentInput] = useState(initialShipmentInput);
  const [shipmentInputErr, setShipmentInputErr] = useState({
    modeErr: "",
    recipientErr: "",
    itemErr: "",
  });
  const [itemObject, setItemObject] = useState({
    itemName: "",
    quantity: "",
    serialNumber: "",
    vendor: "",
    productUrl: "",
    type: 3,
  });

  const addItemHandler = () => {
    if (isObjEmpty(itemObject)) {
      setShipmentInput({
        ...shipmentInput,
        item: [...shipmentInput.item, itemObject],
      });
    }
    setItemObject({
      itemName: "",
      quantity: "",
      serialNumber: "",
      vendor: "",
      productUrl: "",
      type: 3,
    });
  };

  const recipientModalHandler = () => {
    setReceiverError("");
    setRecipientModal(!recipientModal);
  };

  const deleteItemHandler = (delIndex) => {
    setShipmentInput({
      ...shipmentInput,
      item: shipmentInput.item.filter((data, index) => index !== delIndex),
    });
    console.log(shipmentInput);
  };

  const setState = (event) => {
    if (event.target.id === "courier-type") {
      setShipmentInput({
        ...shipmentInput,
        courierType: event.target.value,
      });
    }
  };

  const getUserRecipientApi = async () => {
    const response = await sendRequest(
      `receiver/user_receivers/${auth.userId}`
    );
    setReceiverList(response?.data?.recipients);
  };

  const createUserRecipientApi = async () => {
    if (!isObjEmpty(receiverInput)) {
      setReceiverError("Please fill the form first.");
      return;
    }
    setReceiverError("");
    try {
      const response = await sendRequest(`receiver/create_receiver`, "POST", {
        name: receiverInput.name,
        address: receiverInput.address,
        phoneNumber: receiverInput.phoneNumber,
        city: receiverInput.city,
        user: auth.userId,
      });
      setReceiverList([...receiverList, response?.data]);

      setReceiverInput({
        name: "",
        address: "",
        phoneNumber: "",
        city: "",
      });
      recipientModalHandler();
      setRecipientToast(true);
    } catch (err) {
      console.log(err);
    }
  };

  const createUserShipmentApi = async (event) => {
    if (
      shipmentInput.courierType === "" ||
      shipmentInput.courierType === "null"
    ) {
      setShipmentInputErr({
        modeErr: "Please select a shipment mode.",
      });
      return;
    }
    if (shipmentInput.receiver === "" || shipmentInput.receiver === "null") {
      setShipmentInputErr({
        recipientErr: "Please select a recipient.",
      });
      return;
    }
    if (shipmentInput.item.length === 0) {
      setShipmentInputErr({
        itemErr: "Please add items.",
      });
      return;
    }
    console.log(shipmentInput);

    try {
      await sendRequest(
        `shipment/create_customer_buynship`,
        "POST",
        shipmentInput
      );
      setShipmentSuccessStatus(true);
      setShipmentInput(initialShipmentInput);
      setShipmentInputErr({
        modeErr: "",
        recipientErr: "",
        itemErr: "",
      });
    } catch (err) {
      setErrorText("Something went wrong, please try again.");
    }

    setShipmentInputErr({
      modeErr: "",
      recipientErr: "",
      itemErr: "",
    });
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
    getUserRecipientApi();
    getPackingProductsApi();
  }, []);

  return (
    <React.Fragment>
      <Toast
        show={recipientToast}
        setShow={setRecipientToast}
        closeBtn
        time="1500"
        icon={<MdDoneAll size={120} />}
        text="Recipient Added"
      />

      <Toast
        show={shipmentSuccessStatus}
        setShow={setShipmentSuccessStatus}
        closeBtn
        time="1500"
        icon={<MdDoneAll size={120} />}
        text="Shipment Created"
      />

      <InnerHeadingFrame
        icon={<FaBoxes className="mt-3" size={35} />}
        heading="Create New Shipment"
      >
        <Card>
          <div className="row my-5 mx-2">
            <div className="col-4">
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
            <div className="col-4">
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
            <div className="col-4 pt-3">
              <select
                className="custom-select-field"
                id="courier-type"
                value={shipmentInput.courierType}
                onChange={setState}
              >
                <option value="null">Select Shipment Type</option>
                <option value="PLANE">Air</option>
                <option value="SHIP">Sea</option>
              </select>
            </div>

            <div className="col-md-12">
              <h5 className="form-heading">Receiver Information:</h5>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-10 pr-md-0">
                    <select
                      className="custom-select-field"
                      value={shipmentInput.receiver}
                      onChange={(e) =>
                        setShipmentInput({
                          ...shipmentInput,
                          receiver: e.target.value,
                        })
                      }
                    >
                      <option value="null">Select a Recipient</option>
                      {receiverList &&
                        receiverList.map((data, index) => (
                          <option
                            key={index}
                            value={data?.id}
                          >{`${data?.name} - ${data?.address}`}</option>
                        ))}
                    </select>
                  </div>
                  <div className="col-md-2">
                    <button
                      type="button"
                      className="btn btn-primary w-100 h-100"
                      onClick={recipientModalHandler}
                    >
                      Add New Recipient
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12">
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
                        <th>Order Number</th>
                        <th>Item / Description</th>
                        <th>Quantity</th>
                        <th>Vendor</th>
                        <th>Product Url</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {shipmentInput?.item?.map((data, index) => (
                        <tr key={index}>
                          <td>{data.serialNumber}</td>
                          <td>{data.itemName}</td>
                          <td>{data.quantity}</td>
                          <td>{data.vendor}</td>
                          <td>{data.productUrl}</td>
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
                >
                  <BsArrowDown size={25} className="text-dark" /> &nbsp; Add new
                  item
                </button>
                <div className="collapse add-item-form" id="addItemCollapse">
                  <div className="row">
                    <div className="col-4">
                      <Input
                        type="text"
                        label="Order Number"
                        min="0"
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
                        min="0"
                        value={itemObject.itemName}
                        onChange={(e) =>
                          setItemObject({
                            ...itemObject,
                            itemName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-4">
                      <Input
                        type="number"
                        label="Quantity"
                        min="0"
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
                        type="text"
                        label="Vendor"
                        min="0"
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
                        type="text"
                        label="Product Url"
                        min="0"
                        value={itemObject.productUrl}
                        onChange={(e) =>
                          setItemObject({
                            ...itemObject,
                            productUrl: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="input-group col-4 mt-3">
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

            <div className="input-group my-4 mx-3 justify-content-end">
              <div className="flex-column text-right">
                <p className="text-danger">
                  {shipmentInputErr.modeErr ||
                    shipmentInputErr.recipientErr ||
                    shipmentInputErr.itemErr ||
                    errorText}
                </p>
                <button
                  className="btn btn-primary"
                  onClick={createUserShipmentApi}
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

      <Modal
        show={recipientModal}
        onCancel={recipientModalHandler}
        headerContent="Enter Recipient Details"
        footerContent={
          <React.Fragment>
            <button
              type="button"
              className="btn btn-light"
              onClick={recipientModalHandler}
            >
              Close
            </button>
            <button
              type="button"
              onClick={createUserRecipientApi}
              className="btn btn-primary px-3 ml-2"
            >
              {isLoading ? (
                <LoadingSpinner xsmall color="white" small />
              ) : (
                "Submit"
              )}
            </button>
          </React.Fragment>
        }
      >
        <div className="modal-body pt-0">
          <Input
            type="text"
            id="name"
            label="Recipient's Name"
            value={receiverInput.name}
            onChange={(e) =>
              setReceiverInput({
                ...receiverInput,
                name: onlyAlphabet(e.target.value),
              })
            }
          />
          <Input
            type="text"
            id="phoneNumber"
            label="Phone Number"
            value={receiverInput.phoneNumber}
            onChange={(e) =>
              setReceiverInput({
                ...receiverInput,
                phoneNumber: e.target.value,
              })
            }
          />
          <Input
            type="text"
            id="city"
            label="City"
            value={receiverInput.city}
            onChange={(e) =>
              setReceiverInput({
                ...receiverInput,
                city: onlyAlphabet(e.target.value),
              })
            }
          />
          <Input
            type="text"
            label="Address"
            id="address"
            value={receiverInput.address}
            onChange={(e) =>
              setReceiverInput({
                ...receiverInput,
                address: e.target.value,
              })
            }
          />
          {receiverError && (
            <p className="text-danger mb-0 pt-3 pl-3">{receiverError}</p>
          )}
        </div>
      </Modal>
    </React.Fragment>
  );
};
export default BuyNShipForm;
