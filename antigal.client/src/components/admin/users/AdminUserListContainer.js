import React, { useState, useEffect } from "react";
import AdminNav from "../AdminNav";
import Swal from "sweetalert2";
import fakeUsers from "../../../data/fakeUsers";
import UserList from "./UserList";

const AdminUserListContainer = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
    const useBackend = false;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (useBackend) {
          const response = await fetch(
            "http://localhost:5279/api/User/getUsers"
          );
          if (!response.ok) {
            throw new Error("Error al obtener usuarios del backend");
          }
          const data = await response.json();
          setUsers(data);
        } else {
          const storedUsers = localStorage.getItem("users");
          if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
          } else {
            setUsers(fakeUsers);
            localStorage.setItem("users", JSON.stringify(fakeUsers));
          }
        }
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        Swal.fire("Error", "No se pudieron obtener los usuarios.", "error");
      }
    };

    fetchUsers();
  }, [useBackend]);

  const filteredUsers = users.filter((user) => {
    const matchesSearchTerm =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRoleFilter = roleFilter
      ? user.role.toLowerCase() === roleFilter.toLowerCase()
      : true;

    return matchesSearchTerm && matchesRoleFilter;
  });

  const deleteUserFromBackend = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5279/api/User/deleteUser/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar usuario del backend");

      setUsers(users.filter((user) => user.id !== userId));
      Swal.fire("Eliminado", "El usuario ha sido eliminado.", "success");
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      Swal.fire("Error", "No se pudo eliminar el usuario.", "error");
    }
  };

  const toggleUserRoleInBackend = async (userId, newRole) => {
    try {
      const response = await fetch(`http://localhost:5279/api/User/updateUserRole/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      if (!response.ok) throw new Error("Error al actualizar rol en el backend");

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
      Swal.fire("Cambio realizado", `El rol del usuario ha sido actualizado a ${newRole}.`, "success");
    } catch (error) {
      console.error("Error al actualizar rol:", error);
      Swal.fire("Error", "No se pudo actualizar el rol.", "error");
    }
  };

  const handleToggleRole = (userId) => {
    const user = users.find((user) => user.id === userId);
    const newRole = user.role === "Administrador" ? "Usuario" : "Administrador";

    Swal.fire({
      title: "¿Estás seguro?",
      text: `Estás a punto de ${
        user.role === "Administrador" ? "remover los permisos de administrador" : "asignar permisos de administrador"
      } a ${user.name}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        if (useBackend) {
          toggleUserRoleInBackend(userId, newRole);
        } else {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === userId ? { ...user, role: newRole } : user
            )
          );
          Swal.fire("Cambio realizado", `El rol de ${user.name} ha sido actualizado a ${newRole}.`, "success");
        }
      }
    });
  };

  const handleDeleteUser = (userId) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        if (useBackend) {
          deleteUserFromBackend(userId);
        } else {
          setUsers(users.filter((user) => user.id !== userId));
          Swal.fire("Eliminado", "El usuario ha sido eliminado.", "success");
        }
      }
    });
  };


  return (
    <div className="admin-page">
      <AdminNav />
      <div className="content">
      <h2>Listar usuarios</h2>
        <div className="admin-user">
            
          <div className="search-filter-container">
            <input
              type="text"
              placeholder="Buscar usuario..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="">Filtrar por rol</option>
              <option value="Administrador">Administrador</option>
              <option value="Usuario">Usuario</option>
            </select>
          </div>
          <div className="list-content">
            <UserList
              users={filteredUsers}
              handleToggleRole={handleToggleRole}
              handleDeleteUser={handleDeleteUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserListContainer;
