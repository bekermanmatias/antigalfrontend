import React from "react";

const UserItem = ({ user, handleToggleRole, handleDeleteUser }) => {
  return (
    <tr key={user.id}>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td className="action">
        <button
          className={`role-toggle-btn ${user.role === "Administrador" ? "admin" : "user"}`}
          onClick={() => handleToggleRole(user.id)}
        >
          {user.role === "Administrador" ? "Remover Admin" : "Hacer Admin"}
        </button>
        <button
          className="delete-btn"
          onClick={() => handleDeleteUser(user.id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default UserItem;
