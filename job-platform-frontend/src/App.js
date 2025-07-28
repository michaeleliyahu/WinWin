import { Routes, Route, Navigate } from "react-router-dom";
import HeaderBar from "./components/HeaderBar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CompanyPage from "./pages/CompanyPage";
import HomePage from "./pages/HomePage";
import LoginSuccess from "./components/LoginSuccess.jsx";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <AppLayout>
      <HeaderBar />
      <Routes>
        <Route path="/" element={<Navigate to="/HomePage" replace />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/login-success" element={<LoginSuccess />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/CompanyPage" element={<CompanyPage />} />
      </Routes>
    </AppLayout>
  );
}


export default App;
