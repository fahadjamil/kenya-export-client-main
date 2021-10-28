import React, { useContext, useEffect, useState, useRef } from "react";
import { MdPerson, MdDoneAll } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

import {
  validate,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/utils/validators";
import Input from "../../../shared/components/Input";
import Card from "../../../shared/components/Card";
import InnerHeadingFrame from "../Navigation/InnerHeadingFrame";
import Toast from "../../../shared/components/Toast";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import {
  isObjEmpty,
  getProfilePictureUrl,
} from "../../../shared/utils/functions";
import { AuthContext } from "../../../shared/context/auth-context";
import { ProfileContext } from "../../../shared/context/profile-context";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";
import "./Profile.css";

const Profile = () => {
  const auth = useContext(AuthContext);
  const profile = useContext(ProfileContext);
  const profileRef = useRef();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [editProfile, setEditProfile] = useState(true);
  const [updatePasswordToast, setUpdatePasswordToast] = useState(false);
  const [wrongPassword, setWrongPassword] = useState("");
  const [phoneNumberState, setPhoneNumberState] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGZGbRNgG_g82yO7ammcXwvtEUDz-0fFxM5_aUUkJoCWT9Q5VBR3cTO9QsPJ4VW1nT0ZM&amp;usqp=CAU"
  );
  const [profileDataCopy, setProfileDataCopy] = useState({});
  const [profileError, setProfileError] = useState({
    nameErr: "",
    countryErr: "",
    cityErr: "",
    addressErr: "",
    phoneErr: "",
    address1Err: "",
    emptyFieldErr: "",
    oldPasswordErr: "",
    newPasswordErr: "",
    confirmPasswordErr: "",
    emptyPasswordErr: "",
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
    console.log(event.target.files[0]);
  };

  const submitProfilePictureApi = async (file) => {
    const formdata = new FormData();

    formdata.append("img", file);
    formdata.append("id", auth.userId);

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
      // window.location.reload();
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

  const updateProfileBtn = () => {
    setEditProfile((prevMode) => !prevMode);
    setProfileDataCopy({ ...profile.profileInput });
    setProfileError({
      nameErr: "",
      countryErr: "",
      cityErr: "",
      addressErr: "",
      address1Err: "",
      emptyFieldErr: "",
    });
  };

  const clearPasswordError = () => {
    setProfileError({
      ...profileError,
      emptyPasswordErr: "",
      oldPasswordErr: "",
      newPasswordErr: "",
      confirmPasswordErr: "",
    });
    setWrongPassword("");
    setUpdatePassword({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const cancelUpdateProfileBtn = () => {
    setEditProfile((prevMode) => !prevMode);
    profile.setProfileInput({ ...profileDataCopy });
    setProfileDataCopy({});
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
      profile.setProfileInput({
        ...profile.profileInput,
        name: e.target.value,
      });
    }

    if (e.target.id == "phone") {
      if (!validate(e.target.value, [VALIDATOR_REQUIRE()])) {
        setProfileError({
          ...profileError,
          nameErr: "Phone is required!",
        });
      } else {
        setProfileError({ ...profileError, phoneErr: "" });
      }
      profile.setProfileInput({
        ...profile.profileInput,
        phoneNumber: e.target.value,
      });
    }

    if (e.target.id == "country") {
      if (!validate(e.target.value, [VALIDATOR_REQUIRE()])) {
        setProfileError({
          ...profileError,
          countryErr: "Country name is required!",
        });
      } else {
        setProfileError({ ...profileError, countryErr: "" });
      }
      profile.setProfileInput({
        ...profile.profileInput,
        country: e.target.value,
      });
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
      profile.setProfileInput({
        ...profile.profileInput,
        city: e.target.value,
      });
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
      profile.setProfileInput({
        ...profile.profileInput,
        address: e.target.value,
      });
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
      profile.setProfileInput({
        ...profile.profileInput,
        address1: e.target.value,
      });
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
    // console.log(profileInput);
    // if (
    //   ((((!profileInput.address === profileInput.address1) ===
    //     profileInput.city) ===
    //     profileInput.email) ===
    //     profileInput.name) ===
    //   ""
    // ) {
    //   setProfileError({
    //     ...profileError,
    //     emptyFieldErr: "All fields are required!",
    //   });
    //   return;
    // }
    clearError();
    updateProfileApi();
  };

  const updatePasswordApi = async () => {
    updatePassword.id = auth.userId;
    try {
      await sendRequest("user/update_password", "PATCH", updatePassword);
      setUpdatePassword({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setUpdatePasswordToast(true);
    } catch (error) {
      if (error.message === "Request failed with status code 422") {
        setWrongPassword("Wrong Password");
      } else {
        setWrongPassword(error.message);
      }
    }
  };

  const updateProfileApi = async () => {
    let profileInput = profile.profileInput;
    profileInput.id = auth.userId;
    try {
      await sendRequest("user/update_profile", "PATCH", profileInput);
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
      // getProfileApi();
    } catch (error) {}
  };

  const getProfileApi = async () => {
    try {
      const response = await sendRequest(`user/user_profile/${auth.userId}`);
      // setProfileInput(response.data.user);
      profile.getData(response.data.user);
    } catch (error) {}
  };

  useEffect(() => {
    getProfileApi();
  }, []);

  useEffect(() => {
    if (profile?.profileInput?.image) {
      setProfilePictureUrl(profile?.profileInput.image);
    }
  }, [profile?.profileInput]);

  return (
    <InnerHeadingFrame
      heading="Profile"
      icon={<MdPerson className="mt-2" size={40} />}
    >
      <Toast
        show={updatePasswordToast}
        setShow={setUpdatePasswordToast}
        closeBtn
        time="1500"
        icon={<MdDoneAll size={120} />}
        text="Password Updated"
      />
      <div className="row">
        <div className="col-md-4 main-profile pr-md-0">
          <Card>
            <div className="profile-left-section">
              <div className="profile-image-section">
                <img
                  className="profile-image"
                  src={profilePictureUrl}
                  alt="Profile Picture"
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
                  value={profile.profileInput.name}
                  onChange={setStateHandler}
                  readOnly={editProfile}
                />
                {profileError.nameErr && (
                  <p className="text-danger px-4">{profileError.nameErr}</p>
                )}
                <p className="">{profile.profileInput.email}</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="collapse" id="updatePasswordCollapse">
              <div className="update-password">
                <form className="col-md-12 px-4">
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
                  {profileError.emptyPasswordErr && (
                    <p className="text-danger pt-2">
                      {profileError.emptyPasswordErr}
                    </p>
                  )}

                  {wrongPassword && (
                    <p className="text-danger pt-2">{wrongPassword}</p>
                  )}
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
              onClick={clearPasswordError}
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
                    onClick={updateProfileBtn}
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
                    onClick={cancelUpdateProfileBtn}
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
                value={profile.profileInput.phoneNumber}
                readOnly={editProfile}
                onChange={setStateHandler}
                error={profileError.phoneErr}
              />

              <Input
                element="textarea"
                label="Primary Address"
                type="text"
                id="address"
                value={profile.profileInput.address}
                readOnly={editProfile}
                onChange={setStateHandler}
                error={profileError.addressErr}
              />

              <Input
                element="textarea"
                label="Secondary Address"
                type="text"
                id="address1"
                value={profile.profileInput.address1}
                readOnly={editProfile}
                onChange={setStateHandler}
                error={profileError.address1Err}
              />

              <Input
                label="City"
                type="text"
                id="city"
                value={profile.profileInput.city}
                readOnly={editProfile}
                onChange={setStateHandler}
                error={profileError.cityErr}
              />

              <Input
                label="Country"
                type="text"
                id="country"
                value={profile.profileInput.country}
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

export default Profile;
