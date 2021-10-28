import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { BsPeopleFill } from "react-icons/bs";

import Table from "../../../shared/components/Table";
import Modal from "../../../shared/components/Modal";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { activeStatus, roleStatus } from "../../../shared/utils/statuses";
import InnerHeadingFrame from "../Navigation/InnerHeadingFrame";
import LoadingSpinner from "../../../shared/components/LoadingSpinner";
import { isObjEmpty } from "../../../shared/utils/functions";
import AddUserForm from "./AddUserForm";
import "./UsersList.css";

const UsersList = () => {
  const role = useParams().role;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [usersList, setUsersList] = useState();
  const [addUserModal, setAddUserModal] = useState(false);
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const addUserModalHandler = () => {
    setAddUserModal((prevMode) => !prevMode);
    setSignupInput({
      name: "",
      email: "",
      password: "",
      role: "",
    });
  };

  const createUserApi = async () => {
    if (!isObjEmpty(signupInput)) {
      return;
    }
    clearError();
    try {
      const response = await sendRequest("user/signup", "POST", signupInput);
      setUsersList([response.data, ...usersList]);
      setSignupInput({
        name: "",
        email: "",
        password: "",
        role: "",
      });
      setAddUserModal(false);
    } catch (err) {}
  };

  const getUsersListApi = async () => {
    try {
      const response = await sendRequest(`user/admin_list`);
      console.log(response?.data?.users);
      setUsersList(response?.data?.users);
    } catch (error) {}
  };

  const tableRouting = {
    route: "/user-detail/",
    idKey: "id",
  };

  const tableData = [
    {
      type: "text",
      name: "Name",
      key: "name",
    },
    {
      type: "date",
      name: "Email Address",
      key: "email",
      style: "bold",
    },
    {
      type: "text",
      name: "City",
      key: "city",
      style: "italic",
    },
    {
      type: "text",
      name: "Phone Number",
      key: "phoneNumber",
    },
    {
      type: "status_icon",
      name: "Role",
      key: "role",
      options: roleStatus,
    },
    {
      type: "status_icon",
      name: "Status",
      key: "active",
      options: activeStatus,
    },
  ];

  const usersFilters = [
    {
      type: "search",
      name: "Search by Email",
      key: "email",
    },
  ];

  useEffect(() => {
    getUsersListApi();
  }, [role]);

  return (
    <React.Fragment>
      <InnerHeadingFrame
        heading="Users List"
        icon={<BsPeopleFill size={33} className="mt-2" />}
        loading={isLoading}
      >
        <div className="row my-3 d-flex justify-content-end">
          <button
            className="btn info-gradient-btn mr-4 shadow"
            onClick={addUserModalHandler}
          >
            Add User
          </button>
        </div>
        <Table
          meta={tableData}
          data={usersList}
          routing={tableRouting}
          error={error}
          filters={usersFilters}
        ></Table>
      </InnerHeadingFrame>

      <Modal
        show={addUserModal}
        onCancel={addUserModalHandler}
        headerContent="Add Admin / Employee"
        footerContent={
          <React.Fragment>
            <button className="btn btn-light" onClick={addUserModalHandler}>
              Cancel
            </button>
            <button
              className="btn info-gradient-btn ml-2"
              onClick={createUserApi}
            >
              {isLoading ? (
                <LoadingSpinner xsmall color="white" />
              ) : (
                "Create User"
              )}
            </button>
          </React.Fragment>
        }
      >
        <AddUserForm
          signupInput={signupInput}
          setSignupInput={setSignupInput}
        />
      </Modal>
    </React.Fragment>
  );
};

export default UsersList;
