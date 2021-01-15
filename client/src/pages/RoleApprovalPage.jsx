import React, { useState, useEffect, useCallback } from "react";
import UploadModal from "../components/UploadModal";
import { getUsers, updateUserRoles } from "../utils/api";
import { USER_ROLES } from "../utils/constants";

import "boxicons";
import "../styles/RoleApprovalPage.css";

const TABLE_HEADERS = {
  First_Name: "First Name",
  Last_Name: "Last Name",
  Email: "Email",
  Role: "Role",
};

const SORT_ORDER = {
  Alpha: "Alpha",
  Reverse_Alpha: "Reverse Alpha",
};

const RoleApprovalPage = () => {
  const [users, setUsers] = useState([]);
  const [alteredRoles, setAlteredRoles] = useState({});
  const [sortedByFirstName, setSortedByFirstName] = useState(true);
  const [sortedByLastName, setSortedByLastName] = useState(false);
  const [sortedByEmail, setSortedByEmail] = useState(false);
  const [sortedByRole, setSortedByRole] = useState(false);
  const [lastClickedHeader, setLastClickedHeader] = useState(
    TABLE_HEADERS.First_Name
  );
  const [searchText, setSearchText] = useState("");
  const [searchByField, setSearchByField] = useState(TABLE_HEADERS.Email);
  const [modalIsActive, setModalIsActive] = useState(false);

  const fetchUsers = async () => setUsers((await getUsers()) || []);
  const onRoleChange = useCallback((user, newRole) => {
    if (user.role !== newRole) {
      setAlteredRoles({
        ...alteredRoles,
        [user._id]: newRole,
      });
    } else if (alteredRoles[user._id]) {
      setAlteredRoles({ ...alteredRoles, [user._id]: undefined });
    }
  });

  const setRoles = async () => {
    const res = await updateUserRoles(alteredRoles);
    // show updated
    showAlert(res.message);
  };

  const showAlert = () => {
    // close message
    setTimeout(() => {}, 2500);
  };

  const sortByUsersByStringFieldInOrder = (field, order) => {
    // mutation
    if (order === SORT_ORDER.Alpha) {
      users.sort((a, b) => a[field].localeCompare(b[field]));
    } else if (order === SORT_ORDER.Reverse_Alpha) {
      users.sort((a, b) => -a[field].localeCompare(b[field]));
    }

    setUsers(users);
  };

  const searchFilter = (fieldStr, inputStr) => {
    const fieldStrLower = fieldStr.toLowerCase();
    const inputStrLower = inputStr.toLowerCase();

    return (
      fieldStrLower
        .substring(0, inputStrLower.length)
        .indexOf(inputStrLower) !== -1 ||
      fieldStrLower.indexOf(inputStrLower) !== -1
    );
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="uploadContainer" class="w-3/5 m-auto relative">
      <h1 class="text-xl font-bold my-4">Role Approval</h1>

      <form
        class="flex align-center h-8 mb-4"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <select
          class="inline-block rounded-sm h-full border-t-2 border-b-2 border-l-2 w-1/6"
          value={searchByField}
          aria-label="Filter Search Bar"
          onChange={(e) => {
            setSearchByField(e.target.value);
          }}
        >
          {Object.values(TABLE_HEADERS).map((header) => (
            <option value={header}>{header}</option>
          ))}
        </select>
        <input
          class="focus:outline-none pl-2 mr-0.75 rounded-sm h-full border-2 w-5/6"
          type="text"
          placeholder="Start typing to filter..."
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        {/* {searchByField === TABLE_HEADERS.Email && (
          <button className="whitelist-btn border-b-2 border-r-2 border-t-2">
            <box-icon name='plus'></box-icon>
          </button>
        )} */}
      </form>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr className="table-row" class="py-2 mb-2">
              <th class="w-1/4">
                <button
                  class="flex justify-between font-bold w-full"
                  onClick={() => {
                    if (sortedByFirstName) {
                      sortByUsersByStringFieldInOrder(
                        "firstName",
                        SORT_ORDER.Alpha
                      );
                    } else {
                      sortByUsersByStringFieldInOrder(
                        "firstName",
                        SORT_ORDER.Reverse_Alpha
                      );
                    }

                    setSortedByFirstName(!sortedByFirstName);
                    setLastClickedHeader(TABLE_HEADERS.First_Name);
                  }}
                >
                  <div>First Name</div>
                  <box-icon
                    className="table-sort-icon"
                    class="ml-2"
                    type="solid"
                    name="chevron-down"
                    size="sm"
                    flip={sortedByFirstName && "vertical"}
                    style={{
                      visibility:
                        lastClickedHeader === TABLE_HEADERS.First_Name
                          ? "visible"
                          : "hidden",
                    }}
                  ></box-icon>
                </button>
              </th>
              <th class="w-1/4">
                <button
                  class="flex justify-between font-bold w-full"
                  onClick={() => {
                    if (sortedByLastName) {
                      sortByUsersByStringFieldInOrder(
                        "lastName",
                        SORT_ORDER.Alpha
                      );
                    } else {
                      sortByUsersByStringFieldInOrder(
                        "lastName",
                        SORT_ORDER.Reverse_Alpha
                      );
                    }

                    setSortedByLastName(!sortedByLastName);
                    setLastClickedHeader(TABLE_HEADERS.Last_Name);
                  }}
                >
                  <div>Last Name</div>
                  <box-icon
                    className="table-sort-icon"
                    class="ml-2"
                    type="solid"
                    name="chevron-down"
                    size="sm"
                    flip={sortedByLastName && "vertical"}
                    style={{
                      visibility:
                        lastClickedHeader === TABLE_HEADERS.Last_Name
                          ? "visible"
                          : "hidden",
                    }}
                  ></box-icon>
                </button>
              </th>
              <th class="w-1/4">
                <button
                  class="flex justify-between font-bold w-full"
                  onClick={() => {
                    if (sortedByEmail) {
                      sortByUsersByStringFieldInOrder(
                        "email",
                        SORT_ORDER.Alpha
                      );
                    } else {
                      sortByUsersByStringFieldInOrder(
                        "email",
                        SORT_ORDER.Reverse_Alpha
                      );
                    }

                    setSortedByEmail(!sortedByEmail);
                    setLastClickedHeader(TABLE_HEADERS.Email);
                  }}
                >
                  <div>Email</div>
                  <box-icon
                    className="table-sort-icon"
                    class="ml-2"
                    type="solid"
                    name="chevron-down"
                    size="sm"
                    flip={sortedByEmail && "vertical"}
                    style={{
                      visibility:
                        lastClickedHeader === TABLE_HEADERS.Email
                          ? "visible"
                          : "hidden",
                    }}
                  ></box-icon>
                </button>
              </th>
              <th class="w-1/4">
                <button
                  class="flex justify-between font-bold w-full"
                  onClick={() => {
                    if (sortedByRole) {
                      sortByUsersByStringFieldInOrder("role", SORT_ORDER.Alpha);
                    } else {
                      sortByUsersByStringFieldInOrder(
                        "role",
                        SORT_ORDER.Reverse_Alpha
                      );
                    }

                    setSortedByRole(!sortedByRole);
                    setLastClickedHeader(TABLE_HEADERS.Role);
                  }}
                >
                  <div>Role</div>
                  <box-icon
                    className="table-sort-icon"
                    class="ml-2"
                    type="solid"
                    name="chevron-down"
                    size="sm"
                    flip={sortedByRole && "vertical"}
                    style={{
                      visibility:
                        lastClickedHeader === TABLE_HEADERS.Role
                          ? "visible"
                          : "hidden",
                    }}
                  ></box-icon>
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="table-body w-full">
            {users.map((user) => {
              switch (searchByField) {
                case TABLE_HEADERS.First_Name:
                  if (!searchFilter(user.firstName, searchText)) return null;
                  break;
                case TABLE_HEADERS.Last_Name:
                  if (!searchFilter(user.lastName, searchText)) return null;
                  break;
                case TABLE_HEADERS.Email:
                  if (!searchFilter(user.email, searchText)) return null;
                  break;
                case TABLE_HEADERS.Role:
                  if (!searchFilter(user.role, searchText)) return null;
                  break;
                default:
                  break;
              }

              return (
                <tr className="table-row table-cell-border">
                  <td className="table-cell table-cell-border">
                    {user.firstName}
                  </td>
                  <td className="table-cell table-cell-border">
                    {user.lastName}
                  </td>
                  <td className="table-cell table-cell-border">{user.email}</td>
                  <td className="table-cell table-cell-border">
                    <select
                      class="w-full"
                      value={alteredRoles[user._id] || user.role}
                      onChange={(e) => {
                        onRoleChange(user, e.target.value);
                      }}
                    >
                      {Object.values(USER_ROLES).map((role) => (
                        <option aria-label={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <button
        className="uploadButton"
        class="flex bg-orange p-2 text-xs rounded text-white bottom-0 right-0 mt-4"
        onClick={() => {
          setRoles();
          setModalIsActive(true);
        }}
      >
        <div className="cloud-icon" class="inline-block">
          <box-icon name="cloud-upload" id="test" color="#ffffff" />
        </div>
        <p class="inline-block ml-2 mt-1">UPDATE</p>
      </button>

      {modalIsActive && (
        <div
          className="modal"
          onClick={() => {
            setModalIsActive(false);
          }}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span
              className="close"
              onClick={() => {
                setModalIsActive(false);
              }}
            >
              &times;
            </span>
            <div className="successMessage">
              <div class="w-16 mt-32 m-auto">
                <box-icon
                  name="check-circle"
                  type="solid"
                  color="#6fcf97"
                  size="lg"
                ></box-icon>
              </div>
              <p class="font-semibold text-center text-xl">
                Successfully Updated
              </p>
              <button
                className="close-button"
                onClick={() => {
                  setModalIsActive(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleApprovalPage;
