import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "../services/userService";

export default function LoginSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const redirectTo = location.state?.redirectTo || "/";

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    async function finalizeLogin() {
      try {
        if (token) {
          localStorage.setItem("token", token);
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
    // redirectTo derived from location.state; included to satisfy exhaustive-deps
  }, [location.search, location.state, navigate, redirectTo]);

  return <p>Signing in with Google...</p>;
}
