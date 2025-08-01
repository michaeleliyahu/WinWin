import { useNavigate } from "react-router-dom";
import PillButton from "../components/PillButton";
import companyCover from "../components/CompanyCover";
import companyApplications from "../components/CompanyApplications";
import { useLocation, useParams } from "react-router-dom";

export default function ApplicationPage() {
  const { id } = useParams();
  const location = useLocation();
  const company = location.state?.company

  return (
    <div>
      <companyApplications />
      <companyCover />
    </div>
  );
}