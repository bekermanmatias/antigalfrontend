import React from "react";
import ErrorAnimation from "./common/ErrorAnimation";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <div className="not-found">
        <ErrorAnimation />
        <h1>404</h1>
        <p >
          ¡Lo sentimos! La página que buscas no se encuentra disponible.
        </p>
        <Link to="/">
          Volver a la página principal
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
