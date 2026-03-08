import logoImg from "../../assets/images/Logo.png";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  amount: number;
  confirmText?: string;
}

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, amount, confirmText = "Ya, lanjutkan" }: ConfirmModalProps) => {
  if (!isOpen) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg p-4 md:p-6 max-w-sm w-full text-center">
        <div className="mb-2 md:mb-3">
          <img src={logoImg} alt="Logo" className="w-10 h-10 md:w-12 md:h-12 mx-auto" />
        </div>

        <p className="text-xs md:text-sm text-gray-600 mb-1">{title}</p>
        <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{formatCurrency(amount)} ?</h2>

        <button
          onClick={onConfirm}
          className="w-full py-2 text-sm md:text-base text-red-600 font-semibold hover:text-red-700 transition-colors mb-2"
        >
          {confirmText}
        </button>
        <button
          onClick={onClose}
          className="w-full py-2 text-sm md:text-base text-gray-600 font-semibold hover:text-gray-700 transition-colors"
        >
          Batalkan
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
