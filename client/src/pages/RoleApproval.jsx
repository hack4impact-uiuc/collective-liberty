import React, { useState, useEffect } from "react";
import { getUsers } from "../utils/api";

import "boxicons";

const RoleApproval = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const data = await getUsers();

      if (!data) {
        // go to not approved page
      }

      setUsers(data);
    }

    fetchUsers();
  }, []);

  return (
    <div className="roleApproval" class="w-3/5 m-auto">
      <h1 class="text-xl font-bold my-4">User Role Approval</h1>
      <table className="user-list" class="table-auto">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoleApproval;
