import { useEffect, useState } from "react";
import axios from "axios";

type Fakultet = {
  idFakultet: number;
  nazivFakulteta: string;
};

export function useFakultet() {
  const [fakultet, setColleges] = useState<Fakultet[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/fakulteti") // your Spring Boot URL
      .then((res) => setColleges(res.data))
      .catch((err) => console.error("Failed to fetch colleges:", err));
  }, []);

  return fakultet;
}
