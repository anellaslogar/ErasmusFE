 import React from "react";
import { useNavigate } from "react-router-dom";

const RegisterButton: React.FC = () => {

  const navigate = useNavigate();

  const handleRegister = async () => {
    navigate('/register');
  }
   
  return (
    <div>
      {/* {!isAuthenticated  ? (
        <button className="btn btn-lg btn-link nav-link" onClick={handleRegister} > Registracija </button>    
      ) : (
        <button className="btn btn-lg btn-link nav-link"> Dobro došli/la {user?.name}</button>
     
      )} */}</div>
  );
};

export default RegisterButton;
 