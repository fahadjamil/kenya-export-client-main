import React, { useContext, useEffect, useState, useRef } from "react";
import { AiFillEdit } from "react-icons/ai";
import { BsPeopleFill } from "react-icons/bs";

import {
  validate,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/utils/validators";
import Input from "../../../shared/components/Input";
import Card from "../../../shared/components/Card";
import InnerHeadingFrame from "../Navigation/InnerHeadingFrame";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import {
  isObjEmpty,
  getProfilePictureUrl,
  capitalize,
} from "../../../shared/utils/functions";
import { AuthContext } from "../../../shared/context/auth-context";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";
import { useParams } from "react-router-dom";
import "./UserDetail.css";

const UserDetail = () => {
  const auth = useContext(AuthContext);
  const profileRef = useRef();
  const id = useParams().id;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [editProfile, setEditProfile] = useState(true);
  const [mainLoading, setMainLoading] = useState(false);
  const [phoneNumberState, setPhoneNumberState] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGZGbRNgG_g82yO7ammcXwvtEUDz-0fFxM5_aUUkJoCWT9Q5VBR3cTO9QsPJ4VW1nT0ZM&amp;usqp=CAU"
  );
  const [stats, setStats] = useState();
  const [statsLoading, setStatsLoading] = useState(false);
  const [profileError, setProfileError] = useState({
    nameErr: "",
    countryErr: "",
    cityErr: "",
    addressErr: "",
    address1Err: "",
    emptyFieldErr: "",
    oldPasswordErr: "",
    newPasswordErr: "",
    confirmPasswordErr: "",
    emptyPasswordErr: "",
  });
  const [profileInput, setProfileInput] = useState({
    username: "",
    email: "",
    name: "",
    city: "",
    address: "",
    address1: "",
    image: "",
  });
  const [updatePassword, setUpdatePassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const pickProfilePicHandler = () => {
    profileRef.current.click();
  };

  const selectedProfilePicHandler = (event) => {
    submitProfilePictureApi(event.target.files[0]);
  };

  const submitProfilePictureApi = async (file) => {
    const formdata = new FormData();

    formdata.append("img", file);
    formdata.append("id", id);

    try {
      const response = await sendRequest(
        "user/update_profile_picture",
        "POST",
        formdata,
        {
          "Content-Type": "multipart/form-data",
        }
      );
      console.log(response);
      getProfileApi();
    } catch (err) {
      console.log(err);
    }
  };

  const passwordStateHandler = (e) => {
    if (e.target.id == "oldPassword") {
      if (!validate(e.target.value, [VALIDATOR_REQUIRE()])) {
        setProfileError({
          ...profileError,
          oldPasswordErr: "Password is required!",
        });
      } else {
        setProfileError({ ...profileError, oldPasswordErr: "" });
      }
      setUpdatePassword({ ...updatePassword, oldPassword: e.target.value });
    }

    if (e.target.id == "newPassword") {
      if (!validate(e.target.value, [VALIDATOR_MINLENGTH(8)])) {
        setProfileError({
          ...profileError,
          newPasswordErr: "Password should be 8 characters!",
        });
      } else {
        setProfileError({ ...profileError, newPasswordErr: "" });
      }
      setUpdatePassword({ ...updatePassword, newPassword: e.target.value });
    }

    if (e.target.id == "confirmPassword") {
      if (e.target.value !== updatePassword.newPassword) {
        setProfileError({
          ...profileError,
          confirmPasswordErr: "Password not match!",
        });
      } else {
        setProfileError({ ...profileError, confirmPasswordErr: "" });
      }
      setUpdatePassword({ ...updatePassword, confirmPassword: e.target.value });
    }
  };

  const updateProfile = () => {
    setEditProfile((prevMode) => !prevMode);
    setProfileError({
      nameErr: "",
      countryErr: "",
      cityErr: "",
      addressErr: "",
      address1Err: "",
      emptyFieldErr: "",
    });
  };

  const setStateHandler = (e) => {
    if (e.target.id == "name") {
      if (!validate(e.target.value, [VALIDATOR_REQUIRE()])) {
        setProfileError({
          ...profileError,
          nameErr: "Name is required!",
        });
      } else {
        setProfileError({ ...profileError, nameErr: "" });
      }
      setProfileInput({ ...profileInput, name: e.target.value });
    }

    if (e.target.id == "city") {
      if (!validate(e.target.value, [VALIDATOR_REQUIRE()])) {
        setProfileError({
          ...profileError,
          cityErr: "City name is required!",
        });
      } else {
        setProfileError({ ...profileError, cityErr: "" });
      }
      setProfileInput({ ...profileInput, city: e.target.value });
    }

    if (e.target.id == "address") {
      if (!validate(e.target.value, [VALIDATOR_REQUIRE()])) {
        setProfileError({
          ...profileError,
          addressErr: "Permanent Adrress is required!",
        });
      } else {
        setProfileError({ ...profileError, addressErr: "" });
      }
      setProfileInput({ ...profileInput, address: e.target.value });
    }

    if (e.target.id == "address1") {
      if (!validate(e.target.value, [VALIDATOR_REQUIRE()])) {
        setProfileError({
          ...profileError,
          address1Err: "Temporary Adrress is required!",
        });
      } else {
        setProfileError({ ...profileError, address1Err: "" });
      }
      setProfileInput({ ...profileInput, address1: e.target.value });
    }
  };

  const passwordSubmitHandler = (e) => {
    e.preventDefault();
    if (!isObjEmpty(updatePassword)) {
      setProfileError({
        ...profileError,
        emptyPasswordErr: "All fields are required!",
      });
      return;
    }
    clearError();
    updatePasswordApi();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(profileInput);
    if (!isObjEmpty(profileInput)) {
      setProfileError({
        ...profileError,
        emptyFieldErr: "All fields are required!",
      });
      return;
    }
    clearError();
    updateProfileApi();
  };

  const updatePasswordApi = async () => {
    updatePassword.id = auth.userId;
    try {
      const response = await sendRequest(
        "user/update_password",
        "PATCH",
        updatePassword
      );
      setUpdatePassword({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {}
  };

  const updateProfileApi = async () => {
    profileInput.id = auth.userId;
    try {
      const response = await sendRequest(
        "user/update_profile",
        "PATCH",
        profileInput
      );
      setEditProfile(true);
      setProfileError({
        nameErr: "",
        countryErr: "",
        cityErr: "",
        addressErr: "",
        address1Err: "",
        emptyFieldErr: "",
        oldPasswordErr: "",
        newPasswordErr: "",
        confirmPasswordErr: "",
        emptyPasswordErr: "",
      });
    } catch (error) {}
  };

  const getProfileApi = async () => {
    setMainLoading(true);
    try {
      const response = await sendRequest(`user/user_profile/${id}`);
      setProfileInput(response.data.user);
      setMainLoading(false);
    } catch (error) {
      setMainLoading(false);
    }
  };

  const getDashboardStatsApi = async () => {
    setStatsLoading(true);
    const response = await sendRequest(`shipment/shipment_stats/${id}`);
    setStats(response.data.shipment_stats);
    console.log(response.data.shipment_stats);
    setStatsLoading(false);
  };

  useEffect(() => {
    getProfileApi();
    getDashboardStatsApi();
  }, []);

  useEffect(() => {
    if (profileInput?.image) {
      setProfilePictureUrl(getProfilePictureUrl(profileInput.image));
    }
  }, [profileInput]);

  return (
    <InnerHeadingFrame
      heading="Profile"
      icon={<BsPeopleFill className="mt-2" size={40} />}
      loading={mainLoading}
    >
      <div className="row">
        {profileInput.role === "customer" ? (
          <React.Fragment>
            <div className="col-md-3 col-sm-6 pr-md-0 pr-sm-0">
              <Card className="text-center">
                <h1 className="text-info">
                  {statsLoading ? (
                    <LoadingSpinner small color="info" />
                  ) : (
                    stats?.plane?.total
                  )}
                </h1>
                <p className="m-0">Shipment by Air</p>
              </Card>
            </div>
            <div className="col-md-3 col-sm-6 pr-md-0">
              <Card className="text-center">
                <h1 className="text-info">
                  {statsLoading ? (
                    <LoadingSpinner small color="info" />
                  ) : (
                    stats?.ship?.total
                  )}
                </h1>
                <p className="m-0">Shipment by Ship</p>
              </Card>
            </div>
            <div className="col-md-3 col-sm-6 pr-md-0 pr-sm-0">
              <Card className="text-center">
                <h1 className="text-info">
                  {statsLoading ? (
                    <LoadingSpinner small color="info" />
                  ) : (
                    stats?.buynship?.total
                  )}
                </h1>
                <p className="m-0">Buy n Ship</p>
              </Card>
            </div>
            <div className="col-md-3 col-sm-6">
              <Card className="text-center">
                <h1 className="text-info">
                  {statsLoading ? (
                    <LoadingSpinner small color="info" />
                  ) : (
                    stats?.plane?.total +
                    stats?.ship?.total +
                    stats?.buynship?.total
                  )}
                </h1>
                <p className="m-0">Total Shipments</p>
              </Card>
            </div>
          </React.Fragment>
        ) : (
          ""
        )}
      </div>
      <div className="row">
        <div className="col-md-4 main-profile pr-md-0">
          <Card>
            <div className="profile-left-section">
              <div className="profile-image-section">
                <img
                  className="profile-image"
                  src={profilePictureUrl}
                  alt="profile-image"
                  width="100%"
                />
                <div className="profile-pic-btns">
                  <div className="profile-pic-small-btns">
                    <button
                      className="profile-image-icon btn-info"
                      onClick={pickProfilePicHandler}
                    >
                      <AiFillEdit size={20} />
                    </button>
                  </div>
                </div>
                <input
                  type="file"
                  name="profile_pic"
                  id="profile_pic_input"
                  ref={profileRef}
                  accept=".jpeg, .png, .jpg"
                  style={{ display: "none" }}
                  onChange={selectedProfilePicHandler}
                />
              </div>
              <div className="">
                <input
                  className={`h4 profile-name mt-2 ${
                    !editProfile ? "active" : "inactive"
                  }`}
                  id="name"
                  value={profileInput.name}
                  onChange={setStateHandler}
                  readOnly={editProfile}
                />
                {profileError.nameErr && (
                  <p className="text-danger px-4">{profileError.nameErr}</p>
                )}
                <p className="mb-0">{profileInput?.email}</p>
                <span className="badge badge-info role-badge">
                  {capitalize(profileInput?.role)}
                </span>
              </div>
            </div>
          </Card>
          <Card>
            <div className="collapse" id="updatePasswordCollapse">
              <div className="update-password">
                <form className="col-md-12 px-4">
                  <p className="text-danger">{profileError.emptyPasswordErr}</p>
                  <div className="mt-2">
                    <Input
                      id="oldPassword"
                      label="Old Password"
                      type="password"
                      autoComplete="current-password"
                      value={updatePassword.oldPassword}
                      onChange={passwordStateHandler}
                      error={profileError.oldPasswordErr}
                    />
                  </div>
                  <div className="mt-2">
                    <Input
                      element="input"
                      id="newPassword"
                      label="New Password"
                      type="password"
                      autoComplete="new-password"
                      value={updatePassword.newPassword}
                      onChange={passwordStateHandler}
                      error={profileError.newPasswordErr}
                    />
                  </div>
                  <div className="mt-2">
                    <Input
                      id="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      autoComplete="new-password"
                      value={updatePassword.confirmPassword}
                      onChange={passwordStateHandler}
                      error={profileError.confirmPasswordErr}
                    />
                  </div>
                  <div className="mt-2">
                    <button
                      className="btn btn-primary w-100 mt-2"
                      onClick={passwordSubmitHandler}
                      disabled={
                        !profileError.oldPasswordErr &&
                        !profileError.newPasswordErr &&
                        !profileError.confirmPasswordErr
                          ? false
                          : true
                      }
                    >
                      {isLoading ? (
                        <LoadingSpinner color="white" small />
                      ) : (
                        "Update Password"
                      )}
                    </button>
                  </div>
                  <p className="text-white m-0">...</p>
                </form>
              </div>
            </div>
            <button
              className="btn w-100 py-0 font-weight-bold m-0 text-info"
              style={{ boxShadow: "none" }}
              type="button"
              data-toggle="collapse"
              data-target="#updatePasswordCollapse"
              aria-expanded="false"
              aria-controls="updatePasswordCollapse"
            >
              Change Password
            </button>
          </Card>
        </div>
        <div className="col-md-8 main-information ">
          <Card>
            <div className="d-flex justify-content-between align-items-center pb-3">
              <div className="ml-4">
                {isLoading && <LoadingSpinner color="info" small />}
                {profileError.emptyFieldErr && (
                  <p className="valid-error text-danger px-4">
                    {profileError.emptyFieldErr}
                  </p>
                )}
              </div>

              <div>
                {editProfile ? (
                  <button
                    type="button"
                    className="edit-btn"
                    onClick={updateProfile}
                  >
                    Edit Profile
                    <AiFillEdit size={15} className="ml-2" />
                  </button>
                ) : (
                  <button onClick={handleSubmit} className="edit-btn">
                    Save
                  </button>
                )}
                &nbsp; &nbsp;
                {!editProfile && (
                  <button
                    onClick={updateProfile}
                    className="btn btn-light mr-3"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            <div className="px-4 pb-3">
              <Input
                label="Phone"
                type="text"
                id="phone"
                value={phoneNumberState}
                onChange={(e) => setPhoneNumberState(e.target.value)}
                readOnly
              />

              <Input
                element="textarea"
                label="Primary Address"
                type="text"
                id="address"
                value={profileInput.address}
                readOnly={editProfile}
                onChange={setStateHandler}
                error={profileError.addressErr}
              />

              <Input
                element="textarea"
                label="Secondary Address"
                type="text"
                id="address1"
                value={profileInput.address1}
                readOnly={editProfile}
                onChange={setStateHandler}
                error={profileError.address1Err}
              />

              <Input
                label="City"
                type="text"
                id="city"
                value={profileInput.city}
                readOnly={editProfile}
                onChange={setStateHandler}
                error={profileError.cityErr}
              />

              <Input
                label="Country"
                type="text"
                id="country"
                value={profileInput.country}
                readOnly={editProfile}
                onChange={setStateHandler}
                error={profileError.countryErr}
              />
            </div>
          </Card>
        </div>
      </div>
    </InnerHeadingFrame>
  );
};

export default UserDetail;
