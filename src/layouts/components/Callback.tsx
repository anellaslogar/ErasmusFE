import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../SupabaseClient";
import { SpinnerLoading } from "../../layouts/Utils/SpinnerLoading";

const Callback: React.FC = () => {
  const navigate = useNavigate();

  const insertStudentIfMissing = async () => {
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError || !sessionData.session) {
      navigate("/login");
      return;
    }

    const user = sessionData.session.user;

    const { data: student, error: studentError } = await supabase
      .from("studenti")
      .select("id")
      .eq("id", user.id)
      .single();

    if (studentError && studentError.code === "PGRST116") {
      const stored = localStorage.getItem("pendingProfile");

      if (!stored) {
        console.warn("No profile data found in localStorage");
        navigate("/");
        return;
      }

      const studentiData = JSON.parse(stored);

      const { error: insertError } = await supabase.from("studenti").insert([
        {
          id: user.id,
          email: user.email,
          ime: studentiData.ime,
          prezime: studentiData.prezime,
          college_id: parseInt(studentiData.collegeId),
          role: 2,
        },
      ]);

      if (insertError) {
        console.error("Profile insert error:", insertError.message);
      } else {
        console.log("Profile successfully inserted");
        localStorage.removeItem("pendingProfile");
      }
    }

    navigate("/");
  };

  useEffect(() => {
    insertStudentIfMissing();
  }, []);

  return <SpinnerLoading />;
};

export default Callback;
