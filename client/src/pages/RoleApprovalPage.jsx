import React, { useState, useEffect, useCallback } from "react";
import UploadModal from "../components/UploadModal";
import { getUsers, updateUserRoles } from "../utils/api";
import { USER_ROLES } from "../utils/constants";

import "boxicons";
import "../styles/RoleApprovalPage.css";

const RoleApprovalPage = () => {
  const [users, setUsers] = useState([]);
  const [alteredRoles, setAlteredRoles] = useState({});

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
    showMessage(res.message);
  };

  const showMessage = () => {
    // close message
    setTimeout(() => {}, 2500);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="uploadContainer" class="w-3/5 m-auto relative">
      <h1 class="text-xl font-bold my-4">Role Approval</h1>

      <table className="table table-cell-border" class="table-fixed mb-6">
        <thead>
          <tr className="table-row" class="py-2">
            <th class="w-1/4">First Name</th>
            <th class="w-1/4">Last Name</th>
            <th class="w-1/4">Email</th>
            <th class="w-1/4">Role</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {users.map((user) => (
            <tr className="table-row table-cell-border">
              <td className="table-cell table-cell-border">{user.firstName}</td>
              <td className="table-cell table-cell-border">{user.lastName}</td>
              <td className="table-cell table-cell-border">{user.email}</td>
              <td className="table-cell table-cell-border">
                <select
                  className=""
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
          ))}
        </tbody>
      </table>

      <button
        className="uploadButton"
        class="flex bg-orange p-2 text-xs rounded text-white bottom-0 right-0"
        onClick={() => {
          setRoles();
        }}
      >
        <div className="cloud-icon" class="inline-block">
          <box-icon name="cloud-upload" id="test" color="#ffffff" />
        </div>
        <p class="inline-block ml-2 mt-1">UPDATE</p>
      </button>
    </div>
  );
};

export default RoleApprovalPage;
