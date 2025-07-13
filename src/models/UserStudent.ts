export interface UserStudent {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: "user" | "admin";
  college_id: number;
}
