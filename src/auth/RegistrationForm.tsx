import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaLock,
  FaRegEnvelope,
  FaGraduationCap,
  FaRegUser,
} from "react-icons/fa";
import { SpinnerLoading } from "../layouts/Utils/SpinnerLoading";
import axios from "axios";
import LoginButton from "./LoginButton";
import { supabase } from "../SupabaseClient";
import { Footer } from "../layouts/NavbarAndFooter/Footer";
import Navbar from "../layouts/NavbarAndFooter/Navbar";
import { useSession } from "../hooks/useSession";
export const RegistrationForm: React.FC<{}> = () => {
  const [fakultet, setFakultet] = useState<
    { id: number; nazivFakulteta: string }[]
  >([]);
  const [form, setForm] = useState({
    ime: "",
    prezime: "",
    email: "",
    password: "",
    collegeId: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8080/fakulteti").then((res) => {
      setFakultet(res.data);
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Validate all fields first
    if (
      !form.ime.trim() ||
      !form.prezime.trim() ||
      !form.email.trim() ||
      !form.password.trim() ||
      !form.collegeId
    ) {
      alert("Sva polja trebaju biti upisana.");
      return;
    }
    if (form.password.length < 6) {
      alert("Lozinka mora imati barem 6 znakova.");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          emailRedirectTo: "http://localhost:3000/callback",
          data: {
            ime: form.ime,
            prezime: form.prezime,
            collegeId: form.collegeId,
            role: 2,
          },
        },
      });

      if (error) {
        alert("Greška prilikom registracije: " + error.message);
        return;
      }

      if (!data.user) {
        alert(
          "Molimo potvrdite svoju e-poštu kako biste dovršili registraciju."
        );
        return;
      }

      localStorage.setItem(
        "pendingStudent",
        JSON.stringify({
          ime: form.ime,
          prezime: form.prezime,
          collegeId: form.collegeId,
        })
      );

      alert(
        "Stisnite OK. Pričekajte par sekundi i provjerite mail radi verifikacije."
      );
      setForm({
        ime: "",
        prezime: "",
        email: "",
        password: "",
        collegeId: "",
      });
    } catch (err) {
      console.error(err);
      alert("Neočekivana greška. Pokušajte ponovno.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="wrapper mt-5">
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              id="ime"
              name="ime"
              onChange={handleChange}
              type="text"
              placeholder="Ime"
              required
              disabled={loading}
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              id="prezime"
              name="prezime"
              onChange={handleChange}
              type="text"
              placeholder="Prezime"
              required
              disabled={loading}
            />
            <FaRegUser className="icon" />
          </div>
          <div>
            <label htmlFor="collegeId">Izaberi fakultet:&nbsp;&nbsp;</label>
            <FaGraduationCap className="icon" />
            <span>&nbsp;&nbsp;</span>
            <select
              id="collegeId"
              name="collegeId"
              value={form.collegeId}
              onChange={handleChange}
              required
            >
              <option value=""></option>
              {fakultet.map((college) => (
                <option key={college.id} value={college.id}>
                  {college.nazivFakulteta}
                </option>
              ))}
            </select>
          </div>
          <div className="input-box">
            <input
              id="email"
              name="email"
              onChange={handleChange}
              type="email"
              placeholder="Email"
              required
              disabled={loading}
            />
            <FaRegEnvelope className="icon" />
          </div>
          <div className="input-box">
            <input
              id="password"
              name="password"
              onChange={handleChange}
              type="password"
              placeholder="Lozinka"
              required
              disabled={loading}
            />
            <FaLock className="icon" />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Registriranje..." : "Registriraj se"}
          </button>

          <div className="register-link">
            <div>
              Već imaš račun? <LoginButton />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
