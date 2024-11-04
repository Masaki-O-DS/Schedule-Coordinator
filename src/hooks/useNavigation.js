import { useNavigate } from "react-router-dom";

export default function useNavigation() {
  const navigate = useNavigate();
  const openEditSchedulePage = () => navigate("/edit-schedule-page");
  const openSelectDatePage = () => navigate("/select-date-page");
  const openShareLinkPage = () => navigate("/share-link-page");
  const openTopPage = () => navigate("/");

  return {
    openEditSchedulePage,
    openSelectDatePage,
    openShareLinkPage,
    openTopPage,
  };
}
