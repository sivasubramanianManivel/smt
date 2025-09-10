import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import Login from "./login/page";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  console.log(token)

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.role === "admin") {
       
        redirect("/home");
      }
    } catch (err) {
      console.log("Invalid or expired token:", err.message);
    }
  }

  return <Login />;
}
