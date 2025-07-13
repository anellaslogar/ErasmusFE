import { useState, useEffect } from "react";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { Link } from "react-router-dom";
import { supabase } from "../../SupabaseClient";
import { Session } from "@supabase/supabase-js"; // ✅ Make sure this is imported
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) console.error("Error getting session:", error);
      setSession(session ?? null);
      setLoading(false);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout failed:", error.message);
      return;
    }
    navigate("/"); // Preusmjeri na početnu stranicu
  };

  if (loading) return <SpinnerLoading />;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark main-color py-3">
      <div className="container-fluid">
        <div className="navbar-brand d-flex align-items-center gap-3">
          My Erasmus App
        </div>
        <div className="navbar-nav "></div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle Navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav .float-centar ">
            {!session ? (
              <li
                className="nav-item mt-2 mb-2 mr-2"
                style={{ marginLeft: "10rem" }}
              >
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
            ) : (
              <li
                className="nav-item mt-2 mb-2 mr-2"
                style={{ marginLeft: "10rem" }}
              >
                <Link className="nav-link" to="/profil">
                  Profile
                </Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto">
            {!session ? (
              <li className="nav-item m-1">
                <Link
                  type="button"
                  className="btn btn-outline-light"
                  to="/login"
                >
                  Prijava
                </Link>
              </li>
            ) : (
              <li className="nav-item m-1">
                {
                  <Link
                    onClick={handleLogout}
                    type="button"
                    className="btn btn-outline-light"
                    to="/logout"
                  >
                    Odjava
                  </Link>
                }
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
