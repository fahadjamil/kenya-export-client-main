import React, { useContext, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaBoxes } from "react-icons/fa";
import { MdDoneAll } from "react-icons/md";
import { BsArrowDown } from "react-icons/bs";

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
import Modal from "../../../shared/components/Modal";
import Toast from "../../../shared/components/Toast";
import Input from "../../../shared/components/Input";
import Card from "../../../shared/components/Card";
import SelectCard from "../../../shared/components/SelectCard";
import "./ShipmentForm.css";

const ShipmentForm = () => {
  const auth = useContext(AuthContext);
  const initialShipmentInput = {
    placeOfTransaction: "UK",
    placeOfDestination: "Kenya",
    courierType: "",
    receiver: "",
    user: auth.userId,
    item: [],
    product: [],
    fragilePacking: [],
    pickup: false,
  };

  const intitialItemInput = {
    itemName: "",
    quantity: "",
    weight: "",
    weightUnit: "kgs",
    length: "",
    width: "",
    height: "",
    type: 1
  };

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [errorText, setErrorText] = useState("");
  const [receiverList, setReceiverList] = useState([]);
  const [recipientToast, setRecipientToast] = useState(false);
  const [productsList, setProductsList] = useState([]);
  const [packingProductsList, setPackingProductsList] = useState([]);
  const [receiverError, setReceiverError] = useState("");
  const [recipientModal, setRecipientModal] = useState(false);
  const [shipmentSuccessStatus, setShipmentSuccessStatus] = useState(false);
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
  const [itemObject, setItemObject] = useState(intitialItemInput);
  const [productObj, setSetProductObj] = useState({
    id: "",
    quantity: "",
  });

  const addItemHandler = () => {
    if (isObjEmpty(itemObject)) {
      setShipmentInput({
        ...shipmentInput,
        item: [...shipmentInput.item, itemObject],
      });
    }
    // intitialItemInput.type = 1;
    setItemObject(intitialItemInput);
    console.log(initialShipmentInput)
  };

  const recipientModalHandler = () => {
    setReceiverError("");
    setRecipientModal(!recipientModal);
  };

  const addPoductHanlder = () => {
    let selectedProduct = {};
    for (let i = 0; i < productsList.length; i++) {
      if (productsList[i].id === parseInt(productObj.id)) {
        selectedProduct = productsList[i];
        selectedProduct.quantity = productObj.quantity;
        selectedProduct.type = 3;
        setShipmentInput({
          ...shipmentInput,
          product: [...shipmentInput.product, selectedProduct],
        });
      }
    }

    setSetProductObj({
      id: "",
      quantity: "",
    });
  };

  const deleteItemHandler = (delIndex) => {
    setShipmentInput({
      ...shipmentInput,
      item: shipmentInput.item.filter((data, index) => index !== delIndex),
    });
    console.log(shipmentInput);
  };

  const deleteProductHandler = (delIndex) => {
    console.log(delIndex);
    setShipmentInput({
      ...shipmentInput,
      product: shipmentInput.product.filter(
        (data, index) => index !== delIndex
      ),
    });
  };

  const setState = (event) => {
    if (event.target.id === "courier-type") {
      if (event.target.value == "PLANE") {
        setShipmentInput({
          ...shipmentInput,
          product: [],
        });
      }
      console.log(shipmentInput);

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

  const getProductsApi = async () => {
    const response = await sendRequest(`product/product_list/product`);
    setProductsList(response?.data?.products);
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

  const getFragilePackingQuantityHandler = (id) => {
    for (let i = 0; i < shipmentInput.fragilePacking.length; i++) {
      if (shipmentInput.fragilePacking[i]?.id === id)
        return shipmentInput.fragilePacking[i].quantity;
    }
  };

  const setFragilePackingQuantityHandler = (id, action) => {
    setShipmentInput({
      ...shipmentInput,
      fragilePacking: shipmentInput.fragilePacking.map((data, index) => {
        if (data.id === id)
          return (data = {
            ...data,
            quantity:
              action === "add"
                ? data.quantity + 1
                : data.quantity > 0
                ? data.quantity - 1
                : 0,
          });
        else return data;
      }),
    });
    console.log(shipmentInput);
  };

  // FRAGILE PRODUCTS____________FUNCTIONS

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
      setErrorText("Something went wrong, please try again.");
      console.log(err);
    }
  };

  const createUserShipmentApi = async (event) => {
    setShipmentSuccessStatus(false);
    if (shipmentInput.courierType === "PLANE") {
      setShipmentInput({ ...shipmentInput, product: [] });
    }
    if (
      shipmentInput.courierType === "" ||
      shipmentInput.courierType === "null"
    ) {
      setShipmentInputErr({
        modeErr: "Please select a shipment mode.",
      });
      console.log("Hello");
      return;
    }
    if (shipmentInput.receiver === "" || shipmentInput.receiver === "null") {
      setShipmentInputErr({
        recipientErr: "Please select a recipient.",
      });
      return;
    }
    if (shipmentInput.item.length === 0 && shipmentInput.product.length === 0) {
      setShipmentInputErr({
        itemErr: "Item or Product should be selected.",
      });
      return;
    }
    if (
      shipmentInput.courierType == "PLANE" &&
      shipmentInput.item.length === 0
    ) {
      setShipmentInputErr({
        itemErr: "Item or Product should be selected.",
      });
      return;
    }
    console.log(shipmentInput);
    setShipmentInputErr({
      modeErr: "",
      recipientErr: "",
      itemErr: "",
    });

    try {
      const response = await sendRequest(
        `shipment/create_shipment`,
        "POST",
        shipmentInput
      );

      setShipmentSuccessStatus(true);
      setShipmentInput(initialShipmentInput);
      setItemObject(intitialItemInput);
      setShipmentInputErr({
        modeErr: "",
        recipientErr: "",
        itemErr: "",
      });
    } catch (err) {}
  };

  useEffect(() => {
    getUserRecipientApi();
    getProductsApi();
    getPackingProductsApi();
  }, []);

  useEffect(() => {
    console.log(shipmentInput);
  }, [shipmentInput]);

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
                        <th>Item/Description</th>
                        <th>Quantity</th>
                        <th>Weight</th>
                        <th>Length</th>
                        <th>Width</th>
                        <th>Height</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {shipmentInput?.item?.map((data, index) => (
                        <tr key={index}>
                          <td>{data.itemName}</td>
                          <td>{data.quantity}</td>
                          <td>{data.weight} kg</td>
                          <td>{data.length} cm</td>
                          <td>{data.width} cm</td>
                          <td>{data.height} cm</td>
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
                        label="Weight in Kgs"
                        min="0"
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
                        type="number"
                        label="Length in cm"
                        min="0"
                        value={itemObject.length}
                        onChange={(e) =>
                          setItemObject({
                            ...itemObject,
                            length: notNegative(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div className="col-4">
                      <Input
                        type="number"
                        label="Width in cm"
                        min="0"
                        value={itemObject.width}
                        onChange={(e) =>
                          setItemObject({
                            ...itemObject,
                            width: notNegative(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div className="col-4">
                      <Input
                        type="number"
                        label="Height in cm"
                        min="0"
                        value={itemObject.height}
                        onChange={(e) =>
                          setItemObject({
                            ...itemObject,
                            height: notNegative(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div className="input-group col-4 mt-4">
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

            {shipmentInput.courierType === "SHIP" && (
              <div className="col-12 mt-2">
                <div className="item-table-section border">
                  {/* <h5 className="form-heading">
                Item Information:
              </h5> */}
                  {shipmentInput?.product?.length === 0 ? (
                    <p
                      className="text-center m-0 pt-1 pb-3 font-weight-bold"
                      style={{ color: "rgb(176 176 176)" }}
                    >
                      No Products Selected
                    </p>
                  ) : (
                    <table className="shipment-items-table">
                      <thead>
                        <tr>
                          <th>Products</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {shipmentInput?.product?.map((data, index) => (
                          <tr key={index}>
                            <td>{data.name}</td>
                            <td>{data.quantity}</td>
                            <td>£ {data.price}</td>
                            <td className="d-flex justify-content-end">
                              <button
                                className="btn btn-danger px-2 d-flex align-items-center justify-content-center"
                                onClick={() => deleteProductHandler(index)}
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
                    data-target="#addProductCollapse"
                    aria-expanded="false"
                    aria-controls="addProductCollapseLabel"
                  >
                    Add new Products
                  </button>
                  <div
                    className="collapse add-item-form"
                    id="addProductCollapse"
                  >
                    <div className="row">
                      <div className="col-6 pt-3">
                        <select
                          className="custom-select-field"
                          onClick={(e) =>
                            setSetProductObj({
                              ...productObj,
                              id: e.target.value,
                            })
                          }
                        >
                          <option value="null">Select Product</option>
                          {productsList &&
                            productsList.map((product, index) => (
                              <option
                                key={index}
                                value={product.id}
                              >{`${product.name} - £${product.price}`}</option>
                            ))}
                        </select>
                      </div>
                      <div className="col-6">
                        <Input
                          type="number"
                          label="Quantity"
                          min="0"
                          value={productObj.quantity}
                          onChange={(e) =>
                            setSetProductObj({
                              ...productObj,
                              quantity: notNegative(e.target.value),
                            })
                          }
                        />
                      </div>

                      <div className="input-group col-4 mt-4">
                        <button
                          className="btn btn-primary"
                          onClick={addPoductHanlder}
                        >
                          Add Product
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="col-12 mt-2">
              <div className="item-table-section bg-white pt-0">
                <button
                  className="item-collapse-btn"
                  type="button"
                  data-toggle="collapse"
                  data-target="#fragilePackingCollapse"
                  aria-expanded="false"
                  aria-controls="fragilePackingCollapseLabel"
                >
                  <BsArrowDown size={25} className="text-dark" /> &nbsp; Select
                  Fragile Packing
                  <span className="text-secondary">(Optional)</span>
                </button>
                <div className="collapse" id="fragilePackingCollapse">
                  <div className="row px-2">
                    {packingProductsList?.map((data, index) => (
                      <div className="col-md-3 px-2 pt-3" key={index}>
                        <SelectCard
                          id={data.id}
                          name={data.name}
                          quantity={getFragilePackingQuantityHandler(data.id)}
                          setQuantity={setFragilePackingQuantityHandler}
                          price={data.price}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="shipment-submit-row my-4 mx-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={shipmentInput.pickup ? true : false}
                  onChange={() =>
                    setShipmentInput({
                      ...shipmentInput,
                      pickup: !shipmentInput.pickup,
                    })
                  }
                  id="pickupCheckbox"
                />
                <label className="form-check-label">
                  <p className="m-0 pl-2">
                    Select this box if you want the shipment to be picked up at
                    your doorstep.
                    <br />
                    <small>
                      In case of of shipment directly delivered to our
                      wharehouse by yourself, keep checkbox unchecked.
                    </small>
                  </p>
                </label>
              </div>
              <div className="text-right">
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
export default ShipmentForm;
