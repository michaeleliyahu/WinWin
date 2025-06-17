import { Routes, Route, Navigate } from "react-router-dom";
import HeaderBar from "./components/HeaderBar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RoleSelectionPage from "./pages/RoleSelectionPage"; // הוספה

function App() {
  return (
    <>
      <HeaderBar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/role-selection" element={<RoleSelectionPage />} />
      </Routes>
    </>
  );
}

export default App;
