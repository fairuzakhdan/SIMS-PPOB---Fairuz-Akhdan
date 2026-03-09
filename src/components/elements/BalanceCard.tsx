import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchBalance, toggleShowBalance } from "../../store/balanceSlice";
import bgSaldo from "../../assets/images/Background Saldo.png";

const BalanceCard = () => {
  const dispatch = useAppDispatch();
  const { amount: balance, showBalance } = useAppSelector((state) => state.balance);

  useEffect(() => {
    if (balance === null) {
      dispatch(fetchBalance());
    }
  }, [dispatch, balance]);

  const formatBalance = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div 
      className="bg-cover bg-center rounded-2xl p-4 md:p-6 text-white h-full flex flex-col justify-between"
      style={{ backgroundImage: `url(${bgSaldo})` }}
    >
      <div>
        <p className="text-xs md:text-sm mb-2">Saldo anda</p>
        <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-4">
          {showBalance && balance !== null ? formatBalance(balance) : "Rp •••••••"}
        </h2>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs md:text-sm">{showBalance ? "Tutup saldo" : "Lihat saldo"}</span>
        <button 
          onClick={() => dispatch(toggleShowBalance())}
          className="appearance-none bg-transparent border-0 p-0 cursor-pointer flex items-center"
        >
          {showBalance ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 md:w-4 md:h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 md:w-4 md:h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default BalanceCard;
