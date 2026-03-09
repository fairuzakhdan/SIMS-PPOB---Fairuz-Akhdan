import MainLayout from "../layouts/MainLayout";
import ProfileCard from "../elements/ProfileCard";
import BalanceCard from "../elements/BalanceCard";
import ServiceList from "../fragments/ServiceList";
import BannerList from "../fragments/BannerList";

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="grid grid-cols-[1fr_1.5fr] md:grid-cols-2 gap-4 md:gap-8 mb-8">
        <ProfileCard />
        <BalanceCard />
      </div>
      
      <ServiceList />
      <BannerList />
    </MainLayout>
  );
}
