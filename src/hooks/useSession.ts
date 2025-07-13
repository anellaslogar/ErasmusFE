import { useEffect } from "react";
import { supabase } from "../SupabaseClient";
import { UserStudent } from "../models/UserStudent";

export function useSession({
setUserStudent}: {
  setUserStudent: (profile: UserStudent) => void;
}) {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.id) {
        supabase
          .from("studenti")
          .select("*")
          .eq("id", session.user.id)
          .single()
          .then(({ data }) => setUserStudent(data));
      }
    });
  });
}
