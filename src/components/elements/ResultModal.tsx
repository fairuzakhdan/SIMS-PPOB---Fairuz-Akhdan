import { useNavigate } from "react-router-dom";

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  amount: number;
  status: "success" | "failed";
  message?: string;
}

const ResultModal = ({ isOpen, onClose, title, amount, status, message }: ResultModalProps) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handleBackToHome = () => {
    onClose();
    navigate("/");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg p-4 md:p-6 max-w-sm w-full text-center">
        <div className="mb-2 md:mb-3">
          {status === "success" ? (
            <div className="w-10 h-10 md:w-12 md:h-12 mx-auto bg-green-500 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6 md:w-7 md:h-7 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>
          ) : (
            <div className="w-10 h-10 md:w-12 md:h-12 mx-auto bg-red-500 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </div>
          )}
        </div>

        <p className="text-xs md:text-sm text-gray-600 mb-1">{title}</p>
        <h2 className="text-xl md:text-2xl font-bold mb-1">{formatCurrency(amount)}</h2>
        <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">
          {status === "success" ? "berhasil!" : "gagal"}
        </p>
        {message && status === "failed" && (
          <p className="text-[10px] md:text-xs text-red-500 mb-2 md:mb-3">{message}</p>
        )}

        <button
          onClick={handleBackToHome}
          className="w-full py-2 text-sm md:text-base text-red-600 font-semibold hover:text-red-700 transition-colors"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
};

export default ResultModal;
