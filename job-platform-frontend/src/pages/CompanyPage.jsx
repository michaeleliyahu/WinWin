import CompanyCover from "../components/CompanyCover";
import CompanyApplications from "../components/CompanyApplications";
import { useLocation, useParams } from "react-router-dom";

export default function ApplicationPage() {
  const { id } = useParams();
  const location = useLocation();
  const company = location.state?.company

  return (
    <div>
      <CompanyApplications />
      <CompanyCover company={company} />
    </div>
  );
}