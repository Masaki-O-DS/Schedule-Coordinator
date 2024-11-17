import { useNavigate } from "react-router-dom";

export default function useNavigation() {
  const navigate = useNavigate();
  const openEditSchedulePage = () => navigate("/edit-schedule-page");
  const openSelectDatePage = () => navigate("/select-date-page");
  const openShareLinkPage = () => navigate("/share-link-page");
  const openTopPage = () => navigate("/");
  const openEditSchedulePageVisitor = () =>
    navigate("/visitor-edit-schedule-page");
  const openThankyouPage = () => navigate("/thankyou-page");
  const openTimeManagementPage = () => navigate("/time-management-page");
  const openConfirmPage = () => navigate("/confirm-page");

  return {
    openEditSchedulePage,
    openSelectDatePage,
    openShareLinkPage,
    openTopPage,
    openEditSchedulePageVisitor,
    openThankyouPage,
    openTimeManagementPage,
    openConfirmPage,
  };
}
