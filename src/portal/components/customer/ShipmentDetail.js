import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { IoWarning, IoDocumentText } from "react-icons/io5";
import { IoMdDoneAll } from "react-icons/io";
import { MdFlag, MdDoneAll } from "react-icons/md";

import {
	validate,
	VALIDATOR_REQUIRE,
} from "../../../shared/utils/validators.js";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { shipmentStatus } from "../../../shared/utils/statuses";
import {
	shipmentModeNameInverse,
	setDecimalPoints,
	notNegative,
} from "../../../shared/utils/functions";
import InnerHeadingFrame from "../Navigation/InnerHeadingFrame";
import Card from "../../../shared/components/Card";
import TooltipImg from "../../../shared/components/TooltipImg";
import AlertBar from "../../../shared/components/AlertBar";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";
import Input from "../../../shared/components/Input";
import Modal from "../../../shared/components/Modal";
import Toast from "../../../shared/components/Toast.js";
import SelectCard from "../../../shared/components/SelectCard";
import "./ShipmentDetail.css";

const ShipmentDetail = () => {
	const fragileShipment = {
		shipmentId: "",
		fragilePacking: [],
	};
	const history = useHistory();
	const auth = useContext(AuthContext);
	const { isLoading, sendRequest, error, clearError } = useHttpClient();
	const { id } = useParams();
	const [items, setItems] = useState([]);
	const [packing, setPacking] = useState([]);
	const [shipmentDetail, setShipmentDetail] = useState(null);
	const [shipmentStatuses, setShipmentStatuses] = useState([]);
	const [shipmentMode, setShipmentMode] = useState("");
	const [selectedStatus, setSelectedStatus] = useState("");
	const [transactionId, setTransactionId] = useState("");
	const [detailUpdateErr, setDetailUpdateErr] = useState("");
	const [completeShipmentModal, setCompleteShipmentModal] = useState(false);
	const [updateShipmentStatusModal, setUpdateShipmentStatusModal] =
		useState(false);
	const [rejectTransactionModal, setRejectTransactionModal] = useState(false);
	const [addFragilePackingModal, setAddFragilePackingModal] = useState(false);
	const [updateItemStatusModal, setUpdateItemStatusModal] = useState(false);
	const [transactionIdModal, setTransactionIdModal] = useState(false);
	const [buynshipShipmentupdate, setbuynshipShipmentupdateModal] =
		useState(false);
	const [areYouPaidModal, setAreYouPaidModal] = useState(false);
	const [mainLoading, setMainLoading] = useState(false);
	const [selectedItem, setSelectedItem] = useState({
		itemId: 0,
		arrival_status: false,
	});
	const [packingProductsList, setPackingProductsList] = useState([]);
	const [shipmentInput, setShipmentInput] = useState(fragileShipment);
	const [updateShipmentStatusToast, setUpdateShipmentStatusToast] =
		useState(false);
	const [updateArrivalStatusToast, setUpdateArrivalStatusToast] =
		useState(false);
	const [addTransactionIdToast, setAddTransactionIdToast] = useState(false);
	const [rejectTransactionIdToast, setRejectTransactionIdToast] =
		useState(false);
	const [acceptTransactionIdToast, setAcceptTransactionIdToast] =
		useState(false);

	const [selectBuynshipItem, setSelectBuynshipItem] = useState({
		itemId: 0,
	});

	const [itemObject, setItemObject] = useState({
		weight: "",
		weightUnit: "kgs",
		length: "",
		width: "",
		height: "",
	});

	const setState = (event) => {
		if (event.target.id === "transactionId") {
			if (validate(event.target.value, [VALIDATOR_REQUIRE()]))
				setDetailUpdateErr("");
			else setDetailUpdateErr("Transaction ID is Required.");
			setTransactionId(event.target.value);
		} else if (event.target.id === "shipmentStatus") {
			setSelectedStatus(event.target.value);
		} else {
			setShipmentMode(event.target.value);
		}
	};

	const updateItemStatusModalHandler = (id, status) => {
		setUpdateItemStatusModal((prevMode) => !prevMode);
		setSelectedItem({ itemId: id, arrival_status: status });
	};

	const rejectTransactionModalHandler = () => {
		setRejectTransactionModal((prevMode) => !prevMode);
	};

	const addFranilePackingModalHandler = () => {
		setAddFragilePackingModal((prevMode) => !prevMode);
	};

	const updateBuynShipModalHandler = (id) => {
		setbuynshipShipmentupdateModal((prevMode) => !prevMode);
		setSelectBuynshipItem({ itemId: id });
	};

	const areYouPaidModalHandler = () => {
		setAreYouPaidModal((prevMode) => !prevMode);
	};

	const completeShipmentModalHandler = () => {
		setCompleteShipmentModal((prevMode) => !prevMode);
	};

	const updateShipmentStatusModalHandler = () => {
		setUpdateShipmentStatusModal((prevMode) => !prevMode);
	};

	const transactionIdModalHandler = () => {
		setTransactionIdModal((prevMode) => !prevMode);
	};

	const updateItemArrivalStatus = (id, status) => {
		setItems(
			items.map((data, index) => {
				if (data.id === id) {
					data = { ...data, vendorItemAtWarehouse: status };
					return data;
				} else {
					return data;
				}
			}),
		);
	};

	const getShipmentApi = async () => {
		setMainLoading(true);
		try {
			const response = await sendRequest(
				`shipment/shipment_detail/${id}`,
			);
			setItems(response.data.items);
			setShipmentDetail(response.data.shipment);
			setPacking(response.data.packing);
			setMainLoading(false);
		} catch (error) {
			setMainLoading(false);
		}
	};

	const getShipmentStatusesApi = async () => {
		try {
			const response = await sendRequest(`shipment/all_shipment_status`);
			setShipmentStatuses(response.data.shipmentStatus);
		} catch (error) {}
	};

	const completeShipmentApi = async () => {
		if (!shipmentMode) {
			setDetailUpdateErr("Please select a shipment mode.");
			return;
		}
		try {
			await sendRequest(`shipment/complete_buynship`, "PATCH", {
				courierType: shipmentMode,
				shipmentId: id,
			});
			setDetailUpdateErr("");
			completeShipmentModalHandler();
			getShipmentApi();
		} catch (error) {}
	};

	const addTransactionApi = async () => {
		if (!transactionId) {
			setDetailUpdateErr("Please enter a transaction ID.");
			return;
		}
		try {
			const response = await sendRequest(
				`shipment/add_transactionId`,
				"PATCH",
				{
					transactionId,
					shipmentId: id,
				},
			);
			setTransactionId("");
			setShipmentDetail({
				...shipmentDetail,
				transactionId: response.data.transactionId,
				transactionIdVerification: 2,
			});
			transactionIdModalHandler();
			setAddTransactionIdToast(true);
		} catch (error) {}
	};

	const changePaidStatusApi = async () => {
		try {
			await sendRequest(`shipment/accept_payment`, "PATCH", {
				shipmentId: id,
				employee: auth.userId,
			});
			setShipmentDetail({ ...shipmentDetail, paid: true });
			areYouPaidModalHandler();
			setAcceptTransactionIdToast(true);
		} catch (error) {}
	};

	const changeItemArrivalStatusApi = async () => {
		try {
			await sendRequest(`shipment/update_item_status`, "PATCH", {
				itemId: selectedItem.itemId,
				arrival_status: selectedItem.arrival_status,
			});
			updateItemArrivalStatus(
				selectedItem.itemId,
				selectedItem.arrival_status,
			);
			setUpdateItemStatusModal(false);
			setUpdateArrivalStatusToast(true);
		} catch (error) {}
	};

	const rejectTransactionApi = async () => {
		try {
			await sendRequest(`shipment/reject_payment`, "PATCH", {
				shipmentId: id,
				employee: auth.userId,
			});
			setShipmentDetail({
				...shipmentDetail,
				transactionIdVerification: 0,
				transactionId: null,
			});
			rejectTransactionModalHandler();
			setRejectTransactionIdToast(true);
		} catch (error) {}
	};

	const updateShipmentStatusApi = async () => {
		try {
			await sendRequest(`shipment/update_shipment_status`, "PATCH", {
				shipmentId: id,
				status: selectedStatus,
				employee: auth.userId,
			});
			updateShipmentStatusModalHandler();
			getShipmentApi();
			setUpdateShipmentStatusToast(true);
		} catch (error) {}
	};

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
	};

	const addFragilePackingApi = async () => {
		shipmentInput.shipmentId = id;
		try {
			const response = await sendRequest(
				`shipment/add_fragile_packing`,
				"PATCH",
				shipmentInput,
			);
			console.log(response);
			console.log(packing);
			addFranilePackingModalHandler();
			getPackingProductsApi();
			getShipmentApi();
		} catch (error) {}
	};

	const updateBuynShipApi = async () => {
		console.log(id);
		let shipmentId = id;
		itemObject.itemId = selectBuynshipItem.itemId;
		const response = await sendRequest(
			`shipment/add_package_details/${shipmentId}`,
			"PATCH",
			[{ ...itemObject }],
		);
		console.log(response);
		setItemObject({
			weight: "",
			length: "",
			width: "",
			height: "",
		});
		updateBuynShipModalHandler();
		getShipmentApi();
		console.log(shipmentDetail);
	};

	useEffect(() => {
		console.log(shipmentInput);
		getShipmentApi();
		getShipmentStatusesApi();
		getPackingProductsApi();
	}, []);

	return (
		<InnerHeadingFrame
			heading="Shipment Detail"
			icon={<IoDocumentText className="mt-3" size={42} />}
			loading={mainLoading}
		>
			<Toast
				show={updateShipmentStatusToast}
				setShow={setUpdateShipmentStatusToast}
				closeBtn
				time="1500"
				icon={<MdDoneAll size={120} />}
				text="Status Updated"
			/>
			<Toast
				show={updateArrivalStatusToast}
				setShow={setUpdateArrivalStatusToast}
				closeBtn
				time="1500"
				icon={<MdDoneAll size={120} />}
				text="Status Updated"
			/>
			<Toast
				show={addTransactionIdToast}
				setShow={setAddTransactionIdToast}
				closeBtn
				time="1500"
				icon={<MdDoneAll size={120} />}
				text="Transaction Id Added"
			/>
			<Toast
				show={rejectTransactionIdToast}
				setShow={setRejectTransactionIdToast}
				closeBtn
				time="1500"
				icon={<MdDoneAll size={120} />}
				text="Transaction Id Rejected"
			/>
			<Toast
				show={acceptTransactionIdToast}
				setShow={setAcceptTransactionIdToast}
				closeBtn
				time="1500"
				icon={<MdDoneAll size={120} />}
				text="Paid"
			/>
			{/* <Toast
        show={addFragilePackingToast}
        setShow={setAddFragilePackingToast}
        closeBtn
        time="1500"
        icon={<MdDoneAll size={120} />}
        text="Paid"
      /> */}
			<section className="mt-3">
				{shipmentDetail && (
					<React.Fragment>
						{(auth.role === "employee" ||
							auth.role === "admin") && (
							<React.Fragment>
								{shipmentDetail?.transactionIdVerification ===
									0 && (
									<AlertBar icon={<IoWarning size={20} />}>
										Transaction ID is Rejected.
									</AlertBar>
								)}

								{shipmentDetail?.transactionId !== null &&
									shipmentDetail?.paid === false && (
										<AlertBar
											icon={<IoWarning size={20} />}
											button={
												<React.Fragment>
													<button
														className="btn btn-sm btn-danger px-3 mr-2"
														onClick={
															rejectTransactionModalHandler
														}
													>
														Reject Transaction Id
													</button>
													<button
														className="btn btn-sm btn-outline-danger px-3"
														onClick={
															areYouPaidModalHandler
														}
													>
														Change Status to Paid
													</button>
												</React.Fragment>
											}
										>
											Transaction ID check is pending,
											please verify and update the status.
										</AlertBar>
									)}

								<AlertBar
									color="info"
									icon={<MdFlag size={20} />}
									button={
										<button
											className="btn btn-sm btn-outline-info px-3"
											onClick={
												updateShipmentStatusModalHandler
											}
										>
											Update Shipment Status
										</button>
									}
								>
									You can update shipment status here.
								</AlertBar>
							</React.Fragment>
						)}
						{auth.role === "customer" && (
							<React.Fragment>
								{shipmentDetail?.transactionIdVerification ===
									0 && (
									<AlertBar
										icon={<IoWarning size={20} />}
										button={
											<button
												className="btn btn-sm btn-outline-danger px-3"
												onClick={
													transactionIdModalHandler
												}
											>
												Add Transaction Id
											</button>
										}
									>
										Your Transaction ID is rejected, please
										add a valid Transaction ID.
									</AlertBar>
								)}

								{shipmentDetail?.courierType &&
									shipmentDetail?.transactionId === null &&
									shipmentDetail?.transactionIdVerification ===
										1 && (
										<AlertBar
											icon={<IoWarning size={20} />}
											button={
												<button
													className="btn btn-sm btn-outline-danger px-3"
													onClick={
														transactionIdModalHandler
													}
												>
													Add Transaction Id
												</button>
											}
										>
											Your payment for this shipment is
											pending, we won't be able to deliver
											it.
										</AlertBar>
									)}
								{!shipmentDetail?.courierType && (
									<AlertBar
										icon={<IoWarning size={20} />}
										button={
											<button
												className="btn btn-sm btn-outline-danger px-3"
												onClick={
													completeShipmentModalHandler
												}
											>
												Complete the shipment
											</button>
										}
									>
										Please complete your shipment to process
										it.
									</AlertBar>
								)}
							</React.Fragment>
						)}
					</React.Fragment>
				)}
				<div className="col-md-12 shipment-detail-section">
					<div className="row">
						<div className="col-md-6 pr-md-0">
							<Card className="px-4 py-1">
								<h5 className="form-heading">
									Shipment Information:
								</h5>
								<span>
									<p>Place of Transaction:</p>
									<p>{shipmentDetail?.placeOfTransaction}</p>
								</span>
								<span>
									<p>Place of Destination:</p>
									<p>{shipmentDetail?.placeOfDestination}</p>
								</span>
								<span>
									<p>Shipment Type:</p>
									<p>
										{shipmentModeNameInverse(
											shipmentDetail?.courierType,
										)}
									</p>
								</span>
								<span>
									<p>CBV no. :</p>
									<p>{shipmentDetail?.cbvNo}</p>
								</span>
								<span>
									<p>Shipment Code:</p>
									<p>{shipmentDetail?.shipmentCode}</p>
								</span>
								<span>
									<p>Shipment Status:</p>
									<p></p>
									<p>
										{shipmentStatus.map((src, index) =>
											src.value ===
											shipmentDetail?.shipmentStatus
												?.status ? (
												<TooltipImg
													src={src.src}
													key={index}
													index={index}
													width="30px"
												>
													{src.name}
												</TooltipImg>
											) : (
												""
											),
										)}
									</p>
								</span>
								<span>
									<p>Requested for Pickup Shipment:</p>
									{shipmentDetail?.pickup ? (
										<h5 className="mb-0">
											<span className="badge badge-success">
												Yes
											</span>
										</h5>
									) : (
										<h5 className="mb-0">
											<span className="badge badge-danger">
												No
											</span>
										</h5>
									)}
								</span>

								<span>
									<p>Buynship Shipment:</p>
									{shipmentDetail?.buynship ? (
										<h5 className="mb-0">
											<span className="badge badge-success">
												Yes
											</span>
										</h5>
									) : (
										<h5 className="mb-0">
											<span className="badge badge-danger">
												No
											</span>
										</h5>
									)}
								</span>
								{shipmentDetail?.transactionId && (
									<span>
										<p>Transaction Id:</p>
										<p className="badge-info rounded px-2">
											{shipmentDetail?.transactionId}
										</p>
									</span>
								)}
							</Card>
							<Card className="px-4 py-1">
								<h5 className="form-heading">Bank Details:</h5>
								<span>
									<p>Bank Name:</p>
									<p>Barclays Bank</p>
								</span>
								<span>
									<p>Acoount name:</p>
									<p>Kenexports Ltd</p>
								</span>
								<span>
									<p>Sort Code:</p>
									<p>202178</p>
								</span>
								<span>
									<p>Account no:</p>
									<p>10672556</p>
								</span>
							</Card>
						</div>
						<div className="col-md-6">
							{(auth.role === "admin" ||
								auth.role === "employee") && (
								<Card className="px-4 py-1">
									<h5 className="form-heading">
										Customer Information:
									</h5>
									<span>
										<p>Name:</p>
										<Link
											to={`/user-detail/${shipmentDetail?.user?.id}`}
											className="font-weight-bold text-info"
										>
											{shipmentDetail?.user?.name}
										</Link>
									</span>
									<span>
										<p>Email:</p>
										<p>{shipmentDetail?.user?.email}</p>
									</span>
									<span>
										<p>Phone Number:</p>
										<p>
											{shipmentDetail?.user.phoneNumber}
										</p>
									</span>
									<span>
										<p>City:</p>
										<p>{shipmentDetail?.user.city}</p>
									</span>
								</Card>
							)}
							<Card className="px-4 py-1">
								<h5 className="form-heading">
									Recipient Information:
								</h5>
								<span>
									<p>Name:</p>
									<p>{shipmentDetail?.receiver?.name}</p>
								</span>
								<span>
									<p>Address:</p>
									<p>{shipmentDetail?.receiver?.address}</p>
								</span>
								<span>
									<p>Phone Number:</p>
									<p>
										{shipmentDetail?.receiver.phoneNumber}
									</p>
								</span>
								<span>
									<p>City:</p>
									<p>{shipmentDetail?.receiver.city}</p>
								</span>
								<span>
									<p>Payment Status:</p>

									{shipmentDetail?.transactionIdVerification ===
									0 ? (
										<h5 className="mb-0">
											<span className="badge badge-danger">
												Rejected
											</span>
										</h5>
									) : shipmentDetail?.paid ? (
										<h5 className="mb-0">
											<span className="badge badge-success">
												Paid
											</span>
										</h5>
									) : (
										<h5 className="mb-0">
											<span className="badge badge-danger">
												Unpaid
											</span>
										</h5>
									)}
								</span>
							</Card>
						</div>

						{packing?.map((data, index) => (
							<div className="col-md-4" key={index}>
								<Card className="px-3">
									<p className="m-0 font-weight-bold border-bottom pb-2">
										{data.name}
									</p>
									<p className="m-0 pt-1">
										<small>Quantity:</small>
										&nbsp;{data.quantity}
									</p>
									<p className="m-0 text-info h5 pt-2">
										£ {data.shipmentCharges}
									</p>
								</Card>
							</div>
						))}

						<div className="col-12">
							<Card className="px-4 py-1">
								<div className="py-2">
									<table className="shipment-items-table">
										<thead>
											<tr>
												<th>#</th>
												<th>Name</th>
												<th>Quantity</th>
												<th>Weight</th>
												{shipmentDetail?.buynship && (
													<th>Product Url</th>
												)}
												{shipmentDetail?.buynship && (
													<th>Vendor</th>
												)}
												<th className="text-right">
													Shipment Charges
												</th>
												{shipmentDetail?.buynship && (
													<th className="text-right">
														Status
													</th>
												)}
												{/* {shipmentDetail?.buynship && (
                          <th className="text-right">Action</th>
                        )} */}
												<th></th>
											</tr>
										</thead>
										<tbody>
											{items?.map((data, index) => (
												<tr key={index}>
													<td>{index + 1}</td>
													<td className="font-weight-bold">
														{data.name}
													</td>
													<td>{data.quantity}</td>
													<td>
														{data.actualWeight}{" "}
														{data.weightUnit}
													</td>
													{shipmentDetail?.buynship && (
														<td>
															<button className="btn btn-sm btn-success">
																<a
																	href={`${data.productUrl}`}
																	target="_blank"
																	className="link-btn"
																>
																	Go To
																	Product Link
																</a>
															</button>
														</td>
													)}
													{shipmentDetail?.buynship && (
														<td>{data.vendor}</td>
													)}
													<td className="text-right">
														{!!data.shipmentCharges ? (
															`£ ${setDecimalPoints(
																data.shipmentCharges, 2
															)}`
														) : (
															<i>
																Weight is not
																Added.
															</i>
														)}
													</td>
													{shipmentDetail?.buynship && (
														<td className="text-right">
															{data.vendorItemAtWarehouse ? (
																auth.role ===
																"customer" ? (
																	<IoMdDoneAll
																		size={
																			25
																		}
																		fill={
																			"green"
																		}
																	/>
																) : (
																	<button
																		className="btn btn-success btn-sm text-white"
																		onClick={() =>
																			updateItemStatusModalHandler(
																				data.id,
																				false,
																			)
																		}
																	>
																		<IoMdDoneAll
																			size={
																				20
																			}
																			fill={
																				"white"
																			}
																		/>
																	</button>
																)
															) : auth.role ===
															  "customer" ? (
																<h5 className="mb-0 d-inline-block">
																	<span className="badge badge-danger">
																		Not
																		Arrived
																	</span>
																</h5>
															) : (
																<button
																	className="btn btn-sm btn-info"
																	onClick={() =>
																		updateItemStatusModalHandler(
																			data.id,
																			true,
																		)
																	}
																>
																	Item
																	Arrived?
																</button>
															)}
														</td>
													)}
													{(auth.role === "admin" ||
														auth.role ===
															"employee") &&
														shipmentDetail?.buynship && (
															<td className="text-right">
																<button
																	className="btn btn-sm btn-success"
																	onClick={() =>
																		updateBuynShipModalHandler(
																			data.id,
																		)
																	}
																>
																	Edit
																</button>
															</td>
														)}
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</Card>
						</div>
						<div className="col-md-12">
							<div className="row justify-content-end">
								<div className="col-md-6 py-3">
									{(auth.role === "employee" ||
										(auth.role === "admin" &&
											!shipmentDetail?.buynship)) && (
										<button
											className="btn btn-sm btn-info"
											onClick={
												addFranilePackingModalHandler
											}
										>
											Add Fragile Packing
										</button>
									)}
								</div>

								<div className="col-md-6">
									<Card className="px-4 py-3">
										<div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2">
											<p className="m-0 font-weight-bold text-secondary h6">
												Handling Fee:
											</p>
											<p className="m-0 font-weight-bold text-secondary h6">
												£ {shipmentDetail?.handlingFee}
											</p>
										</div>
										<div className="d-flex justify-content-between align-items-center">
											<p className="m-0 font-weight-bold">
												Total Price:
											</p>
											<p className="m-0 font-weight-bold h5">
												£{" "}
												{parseFloat(
													shipmentDetail?.shipmentCharges +
														shipmentDetail?.handlingFee,
												).toFixed(2)}
											</p>
										</div>
									</Card>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<Modal
				show={transactionIdModal}
				onCancel={() => transactionIdModalHandler(null)}
				headerContent="Add transaction ID from bank"
				footerContent={
					<React.Fragment>
						<button
							type="button"
							className="btn btn-light"
							onClick={() => transactionIdModalHandler(null)}
						>
							Close
						</button>
						<button
							type="button"
							className="btn btn-primary ml-2"
							onClick={addTransactionApi}
						>
							{isLoading ? (
								<LoadingSpinner xsmall color="white" />
							) : (
								"Submit"
							)}
						</button>
					</React.Fragment>
				}
			>
				<div className="px-3">
					<Input
						element="input"
						type="text"
						label="Transaction ID"
						id="transactionId"
						value={transactionId}
						onChange={setState}
						error={detailUpdateErr}
					/>
				</div>
			</Modal>

			<Modal
				show={completeShipmentModal}
				onCancel={completeShipmentModalHandler}
				headerContent="Select a shipment mode"
				footerContent={
					<React.Fragment>
						<button
							type="button"
							className="btn btn-light"
							data-dismiss="modal"
							onClick={completeShipmentModalHandler}
						>
							Close
						</button>
						<button
							type="button"
							className="btn btn-primary ml-2"
							onClick={completeShipmentApi}
						>
							{isLoading ? (
								<LoadingSpinner xsmall color="white" />
							) : (
								"Update"
							)}
						</button>
					</React.Fragment>
				}
			>
				<div className="p-3">
					{detailUpdateErr && (
						<p className="text-danger">{detailUpdateErr}</p>
					)}
					<select
						className="custom-select-field"
						id="shipmentMode"
						value={shipmentMode}
						onChange={setState}
					>
						<option value="null">Select Courier Type</option>
						<option value="PLANE">Plane</option>
						<option value="SHIP">Ship</option>
					</select>
				</div>
			</Modal>

			<Modal
				show={updateItemStatusModal}
				onCancel={updateItemStatusModalHandler}
				footerContent={
					<React.Fragment>
						<button
							type="button"
							className="btn btn-light"
							onClick={updateItemStatusModalHandler}
						>
							No
						</button>
						<button
							type="button"
							className="btn btn-primary ml-2"
							onClick={changeItemArrivalStatusApi}
						>
							{isLoading ? (
								<LoadingSpinner xsmall color="white" />
							) : (
								"Yes"
							)}
						</button>
					</React.Fragment>
				}
			>
				<h5 className="m-0 p-3">
					{selectedItem.arrival_status
						? "Are you sure you want to update the item's to arrived?"
						: "Do you want to update the status of item to not arrived?"}
				</h5>
			</Modal>

			<Modal
				show={areYouPaidModal}
				onCancel={areYouPaidModalHandler}
				footerContent={
					<React.Fragment>
						<button
							type="button"
							className="btn btn-light"
							onClick={areYouPaidModalHandler}
						>
							No
						</button>
						<button
							type="button"
							className="btn btn-primary ml-2"
							onClick={changePaidStatusApi}
						>
							{isLoading ? (
								<LoadingSpinner xsmall color="white" />
							) : (
								"Yes"
							)}
						</button>
					</React.Fragment>
				}
			>
				<h5 className="m-0 p-3">
					Are you sure you want to change the status to paid?
				</h5>
			</Modal>

			<Modal
				show={rejectTransactionModal}
				onCancel={rejectTransactionModalHandler}
				footerContent={
					<React.Fragment>
						<button
							type="button"
							className="btn btn-light"
							onClick={rejectTransactionModalHandler}
						>
							No
						</button>
						<button
							type="button"
							className="btn btn-primary ml-2"
							onClick={rejectTransactionApi}
						>
							{isLoading ? (
								<LoadingSpinner xsmall color="white" />
							) : (
								"Yes"
							)}
						</button>
					</React.Fragment>
				}
			>
				<h5 className="m-0 p-3">
					Are you sure you want to reject the transaction ID?
				</h5>
			</Modal>

			<Modal
				show={updateShipmentStatusModal}
				headerContent="Update Shipment Status"
				onCancel={updateShipmentStatusModalHandler}
				footerContent={
					<React.Fragment>
						<button
							type="button"
							className="btn btn-light"
							data-dismiss="modal"
							onClick={updateShipmentStatusModalHandler}
						>
							Cancel
						</button>
						<button
							type="button"
							className="btn btn-primary ml-2"
							onClick={updateShipmentStatusApi}
						>
							{isLoading ? (
								<LoadingSpinner xsmall color="white" />
							) : (
								"Update"
							)}
						</button>
					</React.Fragment>
				}
			>
				<div className="px-3">
					{detailUpdateErr && (
						<p className="text-danger">{detailUpdateErr}</p>
					)}
					<select
						className="custom-select-field"
						id="shipmentStatus"
						value={selectedStatus}
						onChange={setState}
					>
						<option value="null">Select Shipment Status</option>
						{shipmentStatuses?.map((data, index) => (
							<option key={index} value={data.id}>
								{data.status.charAt(0).toUpperCase() +
									data.status.slice(1).replace("_", " ")}
							</option>
						))}
					</select>
				</div>
			</Modal>

			<Modal
				top="5vh"
				show={addFragilePackingModal}
				headerContent="Add Fragile Packing"
				onCancel={addFranilePackingModalHandler}
				footerContent={
					<React.Fragment>
						<button
							type="button"
							className="btn btn-light"
							data-dismiss="modal"
							onClick={addFranilePackingModalHandler}
						>
							Cancel
						</button>
						<button
							type="button"
							className="btn btn-primary ml-2"
							onClick={addFragilePackingApi}
						>
							{isLoading ? (
								<LoadingSpinner xsmall color="white" />
							) : (
								"Add"
							)}
						</button>
					</React.Fragment>
				}
			>
				<div className="row px-3 pb-2">
					{packingProductsList?.map((data, index) => (
						<div className="col-md-4 px-2 pt-3" key={index}>
							<SelectCard
								id={data.id}
								name={data.name}
								quantity={getFragilePackingQuantityHandler(
									data.id,
								)}
								setQuantity={setFragilePackingQuantityHandler}
								price={data.price}
							/>
						</div>
					))}
				</div>
			</Modal>

			<Modal
				show={buynshipShipmentupdate}
				headerContent="Update Buy & Ship Shipment"
				onCancel={updateBuynShipModalHandler}
				footerContent={
					<React.Fragment>
						<button
							type="button"
							className="btn btn-light"
							data-dismiss="modal"
							onClick={updateBuynShipModalHandler}
						>
							Cancel
						</button>
						<button
							type="button"
							className="btn btn-primary ml-2"
							onClick={updateBuynShipApi}
						>
							{isLoading ? (
								<LoadingSpinner xsmall color="white" />
							) : (
								"Update"
							)}
						</button>
					</React.Fragment>
				}
			>
				<div className="row px-3">
					<div className="col-6">
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
					<div className="col-6">
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
					<div className="col-6">
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
					<div className="col-6">
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
				</div>
			</Modal>
		</InnerHeadingFrame>
	);
};
export default ShipmentDetail;
