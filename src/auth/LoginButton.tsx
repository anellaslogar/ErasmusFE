import React from "react";
import { useNavigate } from "react-router-dom";
const LoginButton: React.FC = () => {
  const navigate = useNavigate();

  return <button onClick={() => navigate("/login")}>Prijavi se</button>;
};
export default LoginButton;
