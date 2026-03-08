import { useState } from "react";
import api from "../../services/api";
import ConfirmModal from "../elements/ConfirmModal";
import ResultModal from "../elements/ResultModal";

const TopUpForm = () => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [modalStatus, setModalStatus] = useState<"success" | "failed">("success");
  const [modalMessage, setModalMessage] = useState("");
  const [submittedAmount, setSubmittedAmount] = useState(0);

  const nominalOptions = [10000, 20000, 50000, 100000, 250000, 500000];

  const MIN_AMOUNT = 10000;
  const MAX_AMOUNT = 1000000;

  const handleNominalClick = (nominal: number) => {
    setAmount(nominal.toString());
    setError("");
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\./g, ""); // Remove dots
    if (value === "" || /^\d+$/.test(value)) {
      setAmount(value);
      setError("");
    }
  };

  const formatInputValue = (value: string) => {
    if (!value) return "";
    return Number(value).toLocaleString("id-ID");
  };

  const isValidAmount = () => {
    const numAmount = Number(amount);
    return numAmount >= MIN_AMOUNT && numAmount <= MAX_AMOUNT;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !isValidAmount()) {
      if (Number(amount) < MIN_AMOUNT) {
        setError(`Minimum nominal top up adalah Rp ${MIN_AMOUNT.toLocaleString("id-ID")}`);
      } else if (Number(amount) > MAX_AMOUNT) {
        setError(`Maksimum nominal top up adalah Rp ${MAX_AMOUNT.toLocaleString("id-ID")}`);
      }
      return;
    }
    setShowConfirmModal(true);
  };

  const handleConfirmTopUp = async () => {
    setShowConfirmModal(false);
    setSubmittedAmount(Number(amount));
    setLoading(true);
    try {
      const response = await api.post("/topup", {
        top_up_amount: Number(amount),
      });
      setModalStatus("success");
      setModalMessage("");
      setAmount("");
      setShowResultModal(true);
    } catch (error: any) {
      setModalStatus("failed");
      setModalMessage(error.response?.data?.message || "Top up gagal");
      setShowResultModal(true);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="mt-8">
      <p className="text-sm text-gray-600 mb-1">Silahkan masukan</p>
      <h2 className="text-xl md:text-2xl font-bold mb-6">Nominal Top Up</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Left: Input & Button */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                </svg>
              </span>
              <input
                type="text"
                value={formatInputValue(amount)}
                onChange={handleAmountChange}
                placeholder="masukan nominal Top Up"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            <button
              type="submit"
              disabled={!amount || Number(amount) === 0 || loading}
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                amount && Number(amount) > 0 && !loading
                  ? "bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {loading ? "Processing..." : "Top Up"}
            </button>
          </form>
        </div>

        {/* Right: Nominal Options */}
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {nominalOptions.map((nominal) => (
            <button
              key={nominal}
              onClick={() => handleNominalClick(nominal)}
              className="py-2 md:py-3 px-2 md:px-4 border border-gray-300 rounded-lg hover:border-red-500 hover:text-red-500 transition-colors text-xs md:text-sm font-medium"
            >
              {formatCurrency(nominal)}
            </button>
          ))}
        </div>
      </div>

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmTopUp}
        title="Anda yakin untuk Top Up sebesar"
        amount={Number(amount) || 0}
        confirmText="Ya, lanjutkan Top Up"
      />

      <ResultModal
        isOpen={showResultModal}
        onClose={() => setShowResultModal(false)}
        title="Top Up sebesar"
        amount={submittedAmount}
        status={modalStatus}
        message={modalMessage}
      />
    </div>
  );
};

export default TopUpForm;
