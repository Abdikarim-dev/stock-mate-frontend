import { useSelector } from "react-redux";
import DashboardCards from "../components/DashboardCards";
import QuickLinks from "../components/QuickLinks";
import RecentActivities from "../components/RecentActivities";
import SummaryInvenInfo from "../components/SummaryInvenInfo";
import UserAvatar from "../components/UserAvatar";
const Home = () => {
  const { activeUser: user } = useSelector((s) => s.auth);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold tracking-tight">Dashboard</span>
        {/* User Avatar Goes here... */}
        <UserAvatar />
      </div>

      {user.role === "ADMIN" && <DashboardCards />}
      <QuickLinks />
      <div
        className={`${
          user.role === "ADMIN" ? "flex" : ""
        } flex-col gap-4  lg:flex-row`}
      >
        {/* Assuming SummaryInvenInfo is a component that displays inventory summary */}
        {/* Replace with actual import if needed */}
        {user.role === "ADMIN" && <SummaryInvenInfo />}
        <RecentActivities />
      </div>
    </div>
  );
};

export default Home;
