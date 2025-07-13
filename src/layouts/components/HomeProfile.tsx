import React, { useEffect } from "react";
import { UserStudent } from "../../models/UserStudent";
import { supabase } from "../../SupabaseClient";

type HomeProfileProps = {
  userStudent: UserStudent | null;
};

const HomeProfile: React.FC<HomeProfileProps> = ({ userStudent }) => {
  const callBackendApi = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const token = session?.access_token;

      if (!token) throw new Error("No access token available");

      const response = await fetch("http://localhost:8080/api/profil", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch the API");
      }

      const data = await response.json();
      console.log("API Response:", data);
    } catch (error) {
      console.error("Error calling backend API:", error);
    }
    console.log("User student:", userStudent?.name, userStudent?.surname);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await callBackendApi();
      } catch (error) {
        console.error("Failed to fetch:", error);
      }
    };

    fetchData();
  }, [userStudent]);
  return (
    <div style={{ color: "white" }}>
      <h1>Dobrodošli!</h1>
      <p>
        Welcome {userStudent?.name} {userStudent?.surname}!
      </p>
    </div>
  );
};

export default HomeProfile;
