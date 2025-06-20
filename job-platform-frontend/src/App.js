import { Routes, Route, Navigate } from "react-router-dom";
import HeaderBar from "./components/HeaderBar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CompanyPage from "./pages/CompanyPage";
import HomePage from "./pages/HomePage";
import ApplicationPage from "./pages/ApplicationPage";
import AppLayout from "./components/AppLayout";
import ThankYouPage from "./pages/ThankYouPage.jsx";

function App() {
  return (
    <AppLayout>
      <HeaderBar />
      <Routes>
        <Route path="/" element={<Navigate to="/HomePage" replace />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/CompanyPage" element={<CompanyPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/submit/:id" element={<ApplicationPage />} />
      </Routes>
    </AppLayout>
  );
}


export default App;
