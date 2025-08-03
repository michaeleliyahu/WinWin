// import { useLocation, useParams } from "react-router-dom";
import { useLocation} from "react-router-dom";
import { CompanyProfile } from "../components/CompanyProfile";
import { CVSubmissions } from "../components/CVSubmissions";
import { StatsCards } from "../components/StatsCards";


export default function CompanyPage() {
  const location = useLocation();
  const company = location.state?.company
  return (
    <div>
      <CompanyProfile company={company}></CompanyProfile>
      <StatsCards company={company}></StatsCards>
      <CVSubmissions company={company}></CVSubmissions>

    </div>
  );
}