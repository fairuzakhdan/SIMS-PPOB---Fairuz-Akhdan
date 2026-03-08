import { useEffect, useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import api from "../../services/api";
import TransactionCard from "../elements/TransactionCard";
import type { Transaction } from "../../types/transaction";

const TransactionList = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<string>("Oktober");

  const fixedMonths = ["Oktober", "November", "Desember", "Januari", "Februari", "Maret", "April"];

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.get("/transaction/history", {
          params: { limit: 100, offset: 0 }
        });
        console.log("Transaction response:", response.data);
        const records = response.data.data?.records || [];
        setTransactions(records);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  // Filter transactions by selected month
  const filteredTransactions = transactions.filter(t => 
    format(new Date(t.created_on), "MMMM", { locale: id }) === selectedMonth
  );

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-4 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-32 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-24" />
          </div>
        ))}
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div>
        {/* Month Tabs */}
        <div className="flex gap-4 md:gap-6 overflow-x-auto mb-4 scrollbar-hide">
          {fixedMonths.map((month) => (
            <button
              key={month}
              onClick={() => setSelectedMonth(month)}
              className={`text-xs md:text-sm whitespace-nowrap transition-colors ${
                selectedMonth === month
                  ? "text-black font-semibold"
                  : "text-gray-500"
              }`}
            >
              {month}
            </button>
          ))}
        </div>
        
        <div className="text-center text-gray-500 py-8">
          Maaf tidak ada histori transaksi saat ini
        </div>
      </div>
    );
  }

  const displayedTransactions = showAll ? filteredTransactions : filteredTransactions.slice(0, 5);

  return (
    <div>
      {/* Month Tabs */}
      <div className="flex gap-4 md:gap-6 overflow-x-auto mb-4 scrollbar-hide">
        {fixedMonths.map((month) => (
          <button
            key={month}
            onClick={() => {
              setSelectedMonth(month);
              setShowAll(false);
            }}
            className={`text-xs md:text-sm whitespace-nowrap transition-colors ${
              selectedMonth === month
                ? "text-black font-semibold"
                : "text-gray-500"
            }`}
          >
            {month}
          </button>
        ))}
      </div>

      {/* Transaction List */}
      {filteredTransactions.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          Maaf tidak ada histori transaksi saat ini
        </div>
      ) : (
        <>
          <div className={`space-y-2 md:space-y-3 ${showAll ? 'max-h-[500px] overflow-y-auto pr-2' : ''}`}>
            {displayedTransactions.map((transaction) => (
              <TransactionCard key={transaction.invoice_number} transaction={transaction} />
            ))}
          </div>
          
          {!showAll && filteredTransactions.length > 5 && (
            <div className="text-center mt-4">
              <button
                onClick={() => setShowAll(true)}
                className="text-xs md:text-sm text-red-500 font-semibold hover:text-red-600"
              >
                Show more
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TransactionList;
