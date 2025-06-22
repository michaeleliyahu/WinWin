import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "../services/userService";

export default function LoginSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const redirectTo = location.state?.redirectTo || "/HomePage";

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    async function finalizeLogin() {
      try {
        if (token) {
          localStorage.setItem("token", token);
          console.log(token);
          const user = await getCurrentUser();
          localStorage.setItem("user", JSON.stringify(user));
          navigate(redirectTo, { state: location.state });
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Login with Google failed", error);
        navigate("/login");
      }
    }

    finalizeLogin();
  }, [location, navigate]);

  return <p>Signing in with Google...</p>;
}
