import React, { useState } from "react";
import Swal from "sweetalert2";

const ProfilePictureModal = ({ isOpen, onClose, onUploadComplete  }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Solo se permiten archivos de imagen.",
        });
        return;
      }
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }else {
      // Si se elimina la imagen seleccionada
      setFile(null);
      setPreview(file || '');
    }
  };
 
  const handleUpload = () => {
    if (!file) {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Por favor, selecciona un archivo.",
        confirmButtonText: "Aceptar",
      });
      return;
    }
    ///////FALTA CONEXION CON BACK Y LOGICA DE GUARDADO
    const formData = new FormData();
    formData.append("profileImage", file);
    onUploadComplete(formData);
    onClose();
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="top">
            <h2>Subir nueva foto de perfil</h2>
            <button className="modal-close-button" onClick={onClose}>
              <img src="/icons/cruz.svg" alt="cerrar"></img>
            </button>
          </div>

          <input type="file" accept="image/*" onChange={handleFileChange} />
          <div className="bottom">
            <button onClick={handleUpload}>Subir</button>
            <button onClick={onClose}>Cancelar</button>
          </div>
        </div>
      </div>
    )
  );
};

export default ProfilePictureModal;
