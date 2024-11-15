import React from "react";
import UserItem from "./UserItem";

const UserList = ({ users, handleToggleRole, handleDeleteUser }) => {
  if (users.length === 0) {
    return <p>No se encontraron usuarios.</p>;
  }

  return (
    <div className="user-list">
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserItem
              key={user.id}
              user={user}
              handleToggleRole={handleToggleRole}
              handleDeleteUser={handleDeleteUser}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
