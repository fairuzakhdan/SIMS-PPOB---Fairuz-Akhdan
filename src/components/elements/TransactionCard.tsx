import { format } from "date-fns";
import { id } from "date-fns/locale";
import type { Transaction } from "../../types/transaction";

interface TransactionCardProps {
  transaction: Transaction;
}

const TransactionCard = ({ transaction }: TransactionCardProps) => {
  const isTopUp = transaction.transaction_type === "TOPUP";
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMMM yyyy HH.mm", { locale: id }) + " WIB";
  };

  return (
    <div className="flex justify-between items-center border border-gray-200 rounded-lg p-2 md:p-3">
      <div className="flex-1">
        <div className={`text-sm md:text-base font-bold mb-0.5 ${isTopUp ? "text-green-500" : "text-red-500"}`}>
          {isTopUp ? "+" : "-"} {formatCurrency(transaction.total_amount)}
        </div>
        <div className="text-[9px] md:text-xs text-gray-500">
          {formatDate(transaction.created_on)}
        </div>
      </div>
      <div className="text-[10px] md:text-xs text-gray-700">
        {isTopUp ? "Top Up Saldo" : transaction.description}
      </div>
    </div>
  );
};

export default TransactionCard;
