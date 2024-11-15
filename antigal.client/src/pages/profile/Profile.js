// src/pages/Profile.js
import React, { useEffect, useState } from "react";
import UserDetail from "../../components/users/UserDetail";
import Swal from "sweetalert2";
import ProfilePictureModal from "../../components/users/ProfilePictureModal";
import { useOutletContext } from "react-router-dom";
const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user: currentUser, setUser: setUserData } = useOutletContext();
  const [userData, setUserDataState] = useState(currentUser);
  useEffect(() => {
    setUserDataState(currentUser);
  }, [currentUser]);
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      console.log("ESTAS EDITANDO");
    }
  };

  const handleChange = (key) => (value) => {
    setUserDataState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validateForm = () => {
    const { fechaNacimiento, dni, user, name, email, telefono, genero } =
      userData;
    if (
      !fechaNacimiento.trim() ||
      !dni.trim() ||
      !user.trim() ||
      !name.trim() ||
      !email.trim() ||
      !telefono.trim() ||
      !genero.trim()
    ) {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "No pueden guardarse campos vacíos.",
        confirmButtonText: "Aceptar",
      });
      return false;
    }
    return true;
  };
  const handleUploadComplete = (imageUrl) => {
    setUserDataState((prev) => ({ ...prev, picture: imageUrl }));
    setUserData((prev) => ({ ...prev, picture: imageUrl }));
  };
  const handleSave = () => {
    //Aca falta logica para guardar en backend
    if (!validateForm()) {
      return;
    }
    setUserData(userData);
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <ProfilePictureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUploadComplete={handleUploadComplete}
      />

      <div className="profile-header">
        <div className="header-data">
          <div className="img-container" onClick={() => setIsModalOpen(true)}>
            <img src={userData.picture} alt="" />
            <div className="overlay">
              <img src="/icons/pencil.svg" alt="Edit" className="edit-icon" />
            </div>
          </div>
          <div className="header-info">
            <h2>{userData.name}</h2>
            <p>{userData.user}</p>
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
          value={userData.name}
          isEditing={isEditing}
          onChange={handleChange("name")}
        />
        <UserDetail
          label="Nombre de usuario"
          value={userData.user}
          isEditing={isEditing}
          onChange={handleChange("user")}
        />
        <UserDetail
          label="Correo electrónico"
          value={userData.email}
          isEditing={isEditing}
          onChange={handleChange("email")}
        />
        <UserDetail
          label="Número de teléfono"
          value={userData.telefono}
          isEditing={isEditing}
          onChange={handleChange("telefono")}
        />
        <UserDetail
          label="Fecha de nacimiento"
          value={userData.fechaNacimiento}
          isEditing={isEditing}
          onChange={handleChange("fechaNacimiento")}
        />

        <UserDetail
          label="Dni"
          value={userData.dni}
          isEditing={isEditing}
          onChange={handleChange("dni")}
        />
        <UserDetail
          label="Género"
          value={userData.genero}
          isEditing={isEditing}
          onChange={handleChange("genero")}
        />
      </div>
    </div>
  );
};
export default Profile;
