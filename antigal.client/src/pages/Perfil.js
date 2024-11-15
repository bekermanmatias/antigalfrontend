import React, { useState } from "react";
import UserDetail from "../components/users/UserDetail";
import Swal from "sweetalert2";
import ProfilePictureModal from "../components/users/ProfilePictureModal";

import { useOutletContext } from "react-router-dom";
const Perfil = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user: currentUser } = useOutletContext();



  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      console.log("ESTAS EDITANDO");
    }
  };

  const handleChange = (key) => (value) => {
  }

  
  const handleSave = () => {
   
    if (
      !currentUser.fechaNacimiento.trim() ||
      !currentUser.dni.trim() ||
      !currentUser.user.trim() ||
      !currentUser.name.trim() ||
      !currentUser.email.trim() ||
      !currentUser.telefono.trim() ||
      !currentUser.genero.trim()
    ) {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "No pueden guardarse campos vacíos.",
        confirmButtonText: "Aceptar",
      });
      return;
    }
    setIsEditing(false);
  };



  return (
    <div className="profile-page">
      <ProfilePictureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className="profile-header">
        <div className="header-data" >
          <div className="img-container" onClick={() => setIsModalOpen(true)}>
            <img src={currentUser.picture} alt="" />
            <div className="overlay">
              <img src="/icons/pencil.svg" alt="Edit" className="edit-icon" />
            </div>
          </div>
          <div className="header-info">
            <h2>{currentUser.name}</h2>
            <p>{currentUser.user}</p>
          </div>
        </div>
        <div className="btn-container">
          {!isEditing && (
            <button onClick={handleEditToggle} className="edit-profile-btn">
              Editar Perfil
            </button>
          )}
          {isEditing && (
            <button onClick={handleSave} className="save-profile-btn">
              Guardar
            </button>
          )}{" "}
        </div>
      </div>

      <div className="profile-detail">
        <UserDetail
          label="Nombre y apellido"
          value={currentUser.name}
          isEditing={isEditing}
          onChange={handleChange("name")}
        />
        <UserDetail
          label="Nombre de usuario"
          value={currentUser.user}
          isEditing={isEditing}
          onChange={handleChange("user")}
        />
        <UserDetail
          label="Correo electrónico"
          value={currentUser.email}
          isEditing={isEditing}
          onChange={handleChange("email")}
        />
        <UserDetail
          label="Número de teléfono"
          value={currentUser.telefono}
          isEditing={isEditing}
          onChange={handleChange("telefono")}
        />
        <UserDetail
          label="Fecha de nacimiento"
          value={currentUser.fechaNacimiento}
          isEditing={isEditing}
          onChange={handleChange("fechaNacimiento")}
        />

        <UserDetail
          label="Dni"
          value={currentUser.dni}
          isEditing={isEditing}
          onChange={handleChange("dni")}
        />
        <UserDetail
          label="Género"
          value={currentUser.genero}
          isEditing={isEditing}
          onChange={handleChange("genero")}
        />
      </div>
    </div>
  );
};
export default Perfil;
