import { Routes, Route, Navigate } from "react-router-dom";
import HeaderBar from "./components/HeaderBar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CompanyPage from "./pages/CompanyPage";
import HomePage from "./pages/HomePage";
import CandidateApplication from "./components/CandidateApplication";
import ApplicationPage from "./pages/ApplicationPage";

function App() {
  return (
    <>
      <HeaderBar />
      <Routes>
        <Route path="/" element={<Navigate to="/HomePage" replace />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/CompanyPage" element={<CompanyPage />} />
        <Route path="/ApplicationPage" element={<ApplicationPage />} />
        <Route path="/submit/:id" element={<CandidateApplication />} />
      </Routes>
    </>
  );
}

export default App;
