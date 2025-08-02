import CompanyCover from "../components/CompanyCover";
import CompanyApplications from "../components/CompanyApplications";
import CompanyProgress from "../components/CompanyProgress";
// import { useLocation, useParams } from "react-router-dom";
import { useLocation} from "react-router-dom";

export default function ApplicationPage() {
  // const { id } = useParams();
  const location = useLocation();
  const company = location.state?.company

  return (
    <div className="homepage-container">
      <CompanyCover company={company} />
      <CompanyProgress company={company} />
      <CompanyApplications company={company}/>
    </div>
  );
}