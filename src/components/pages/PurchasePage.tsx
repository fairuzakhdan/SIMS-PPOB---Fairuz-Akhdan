import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { fetchBalance } from '../../store/balanceSlice';
import MainLayout from '../layouts/MainLayout';
import ProfileCard from '../elements/ProfileCard';
import BalanceCard from '../elements/BalanceCard';
import Button from '../elements/Button';
import ConfirmModal from '../elements/ConfirmModal';
import ResultModal from '../elements/ResultModal';
import api from '../../services/api';
import type { Service } from '../../types/service';

export default function PurchasePage() {
  const { serviceCode } = useParams();
  const dispatch = useAppDispatch();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [modalStatus, setModalStatus] = useState<"success" | "failed">("success");
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await api.get('/services');
        const services = response.data.data;
        const found = services.find((s: Service) => s.service_code === serviceCode);
        setService(found || null);
      } catch (error) {
        console.error('Failed to fetch service:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [serviceCode]);

  const handlePurchase = async () => {
    setShowConfirmModal(true);
  };

  const handleConfirmPurchase = async () => {
    if (!service) return;
    
    setShowConfirmModal(false);
    setLoading(true);
    try {
      await api.post('/transaction', {
        service_code: service.service_code
      });
      dispatch(fetchBalance());
      setModalStatus("success");
      setModalMessage("");
      setShowResultModal(true);
    } catch (error: any) {
      setModalStatus("failed");
      setModalMessage(error.response?.data?.message || "Pembayaran gagal");
      setShowResultModal(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="animate-pulse">Loading...</div>
      </MainLayout>
    );
  }

  if (!service) {
    return (
      <MainLayout>
        <p>Service tidak ditemukan</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="grid grid-cols-[1fr_1.5fr] md:grid-cols-2 gap-4 md:gap-8 mb-8">
        <ProfileCard />
        <BalanceCard />
      </div>

      <div className="mt-8 max-w-2xl">
        <p className="text-sm text-gray-600 mb-1">Pembayaran</p>
        <div className="flex items-center gap-2 mb-6">
          <img src={service.service_icon} alt={service.service_name} className="w-6 h-6 md:w-8 md:h-8" />
          <p className="text-base md:text-lg font-semibold">{service.service_name}</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
              </svg>
            </span>
            <input
              type="text"
              value={`Rp ${service.service_tariff.toLocaleString('id-ID')}`}
              disabled
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
            />
          </div>
          <Button onClick={handlePurchase}>
            Bayar
          </Button>
        </div>
      </div>

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmPurchase}
        title={`Beli ${service.service_name} senilai`}
        amount={service.service_tariff}
        confirmText="Ya, lanjutkan Bayar"
      />

      <ResultModal
        isOpen={showResultModal}
        onClose={() => setShowResultModal(false)}
        title={`Pembayaran ${service.service_name} sebesar`}
        amount={service.service_tariff}
        status={modalStatus}
        message={modalMessage}
      />
    </MainLayout>
  );
}
