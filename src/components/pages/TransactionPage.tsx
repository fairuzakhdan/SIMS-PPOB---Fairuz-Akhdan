import MainLayout from "../layouts/MainLayout";
import ProfileCard from "../elements/ProfileCard";
import BalanceCard from "../elements/BalanceCard";
import TransactionList from "../fragments/TransactionList";

export default function TransactionPage() {
  return (
    <MainLayout>
      <div className="grid grid-cols-[1fr_1.5fr] md:grid-cols-2 gap-4 md:gap-8 mb-8">
        <ProfileCard />
        <BalanceCard />
      </div>
      
      <div className="mt-6 md:mt-8">
        <h2 className="text-base md:text-lg font-semibold mb-4">Semua Transaksi</h2>
        <TransactionList />
      </div>
    </MainLayout>
  );
}
