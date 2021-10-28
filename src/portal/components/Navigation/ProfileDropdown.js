import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { RiShutDownLine } from "react-icons/ri";

import Modal from "../../../shared/components/Modal";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";
import { AuthContext } from "../../../shared/context/auth-context";
import { ProfileContext } from "../../../shared/context/profile-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { getProfilePictureUrl } from "../../../shared/utils/functions";
import "./Dropdown.css";

const ProfileDropdown = () => {
  const auth = useContext(AuthContext);
  const profile = useContext(ProfileContext);
  const history = useHistory();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [profilePictureUrl, setProfilePictureUrl] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGZGbRNgG_g82yO7ammcXwvtEUDz-0fFxM5_aUUkJoCWT9Q5VBR3cTO9QsPJ4VW1nT0ZM&amp;usqp=CAU"
  );

  const LogoutHandler = () => {
    auth.logout();
    history.push("/");
  };

  const getProfileApi = async () => {
    try {
      const response = await sendRequest(`user/user_profile/${auth.userId}`);
      profile.getData(response.data.user);
    } catch (error) {}
  };

  useEffect(() => {
    getProfileApi();
  }, []);

  useEffect(() => {
    if (profile?.profileInput?.image) {
      setProfilePictureUrl(profile?.profileInput?.image);
    }
  }, [profile?.profileInput]);

  return (
    <React.Fragment>
      <div className="dropdown">
        <button
          className="btn profile-dropdown dropdown-toggle py-0"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {isLoading ? (
            <LoadingSpinner small className="mr-2" color="info" />
          ) : (
            <img
              src={profilePictureUrl}
              alt="Profile"
              className="profile-picture"
            />
          )}
          <h5 className="dropdown-profile-name pl-2">
            {profile?.profileInput?.name}
          </h5>
        </button>
        <div
          className="profile dropdown-menu dropdown-menu-right shadow"
          style={{
            width: "350px",
            transform: "translate3d(-200px, 40px, 0px)",
          }}
          aria-labelledby="dropdownMenuButton"
        >
          <div className="user-info">
            <p className="user-email">{profile?.profileInput?.email}</p>
            <p>{auth.role.toUpperCase()}</p>
          </div>
          <Link to="/profile">
            <div>
              <BsFillPersonFill size={20} />
              <p className="m-0">Profile</p>
            </div>
          </Link>
          <a onClick={() => setShowLogoutModal(!showLogoutModal)}>
            <div>
              <RiShutDownLine size={20} />
              <p className="m-0">Logout</p>
            </div>
          </a>
        </div>
      </div>

      <Modal
        show={showLogoutModal}
        footerContent={
          <React.Fragment>
            <button
              className="btn btn-light"
              onClick={() => setShowLogoutModal(!showLogoutModal)}
            >
              No
            </button>
            <button className="btn btn-info ml-2" onClick={LogoutHandler}>
              Yes
            </button>
          </React.Fragment>
        }
      >
        <p className="py-3 px-4 m-0">Are you sure you want logout?</p>
      </Modal>
    </React.Fragment>
  );
};

export default ProfileDropdown;
