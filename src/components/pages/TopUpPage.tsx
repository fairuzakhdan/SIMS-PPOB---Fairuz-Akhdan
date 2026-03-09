import MainLayout from "../layouts/MainLayout";
import ProfileCard from "../elements/ProfileCard";
import BalanceCard from "../elements/BalanceCard";
import TopUpForm from "../fragments/TopUpForm";

export default function TopUpPage() {
  return (
    <MainLayout>
      <div className="grid grid-cols-[1fr_1.5fr] md:grid-cols-2 gap-4 md:gap-8 mb-8">
        <ProfileCard />
        <BalanceCard />
      </div>
      
      <TopUpForm />
    </MainLayout>
  );
}
