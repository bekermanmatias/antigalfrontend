import UserSidebar from "./UserSidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const UserLayout = () => {
  const fakeUser = {
    id: 1,
    user: "usuario1",
    name: "Lucas Martinez",
    picture: "/images/fake-user.jpg",
    email: "lucas@example.com", 
    fechaNacimiento: "01/01/1999", 
    telefono: "+1234567890", 
    genero: "Masculino", 
    dni: "41167000", 
  };

  const [ user,  setUser ] = useState(fakeUser);

  
  
  


  return (
    <div className="user-layout">
      <UserSidebar user={user} />
      <div className="content-container">
        <div
          className="user-background"
          style={{
            backgroundImage: "url('/images/user-background.png')",
            width: "100%",
            height: "auto",
            minHeight:"100vh",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Outlet context={{ user: user }} />

        </div>
      </div>
    </div>
  );
};

export default UserLayout;
