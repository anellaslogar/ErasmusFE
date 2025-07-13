import { useState } from "react";
import { supabase } from "../SupabaseClient";
import { useNavigate, Link } from "react-router-dom";
import { UserStudent } from "../models/UserStudent";
import { FaLock, FaRegEnvelope } from "react-icons/fa";

type SigninProps = {
  setUserStudent: (profile: UserStudent) => void;
};

function Login({ setUserStudent }: SigninProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login greška:", error.message);
      alert(
        "Pogrešan email ili lozinka. Provjerite jeste li verificirali email."
      );
      return;
    }

    const { data: student, error: studentError } = await supabase
      .from("studenti")
      .select("*")
      .eq("email", data.user.email)
      .maybeSingle();

    if (studentError || !student) {
      alert("Student nije pronađen.");
      return;
    }
    setUserStudent(student);
    navigate("/");
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="wrapper mt-5">
        <form onSubmit={handleLogin}>
          <div className="input-box">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <FaRegEnvelope className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Lozinka"
              required
            />
            <FaLock className="icon" />
          </div>

          <button type="submit">Prijavi se</button>

          <div className="register-link">
            <div>
              Nemaš račun?{" "}
              <button>
                {" "}
                <Link
                  className="text-decoration-none"
                  style={{ color: "#333" }}
                  to="/register"
                >
                  Registriraj se
                </Link>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
