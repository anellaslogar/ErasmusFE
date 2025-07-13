import "./App.css";
import React, { useState } from "react";
import Navbar from "./layouts/NavbarAndFooter/Navbar";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { Routes, Route } from "react-router-dom";
import HomeProfile from "./layouts/components/HomeProfile";
import { RegistrationForm } from "./auth/RegistrationForm";
import LoginButton from "./auth/LoginButton";
import Callback from "./layouts/components/Callback";
import { UserStudent } from "./models/UserStudent";
import Login from "./auth/Login";
import HomePublic from "./layouts/components/HomePublic";

const App: React.FC = () => {
  const [userStudent, setUserStudent] = useState<UserStudent | null>(null);
  return (
    <>
      <Navbar />
      <div className="flex-grow-1 header">
        <Routes>
          <Route path="/" element={<HomePublic />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route
            path="/login"
            element={<Login setUserStudent={setUserStudent} />}
          />
          <Route
            path="/profil"
            element={<HomeProfile userStudent={userStudent} />}
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
