import React from "react";

const UserDetail = ({ label, value, isEditing, onChange }) => {
  return (
    <div className="user-detail">
      <p className="user-label">{label}</p>
      {isEditing ? (
        label === "Fecha de nacimiento" ? (
          <input
            type="date"
            value={value}
            onChange={(e) => onChange(e.targets.value)}
            placeholder={value}
            required
          />
        ) : label === "Género" ? (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required
          >
            <option value="" disabled>
              Seleccione...
            </option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Neutro">Neutro</option>
          </select>
        ) : label === "Correo electrónico" ? (
          <input
            type={"text"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={value}
            disabled
          />
        ) : (
          <input
            type={"text"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={value}
            required
          />
        )
      ) : (
        <p className="user-info">{value}</p>
      )}
    </div>
  );
};
export default UserDetail;
