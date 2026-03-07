import type { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="w-[70%] h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex">
        <div className="w-1/2 flex flex-col items-center justify-center px-16 relative">
          <div className="flex items-center gap-2.5 mb-8">
            <img src="/images/Logo.png" alt="Logo" className="w-7 h-7" />
            <span className="text-base font-semibold">SIMS PPOB - FAIRUZ AKHDAN</span>
          </div>
          <div className="w-full max-w-[380px]">
            {children}
          </div>
        </div>
        <div className="w-1/2 relative">
          <img 
            src="/images/ilustrasi-login.png" 
            alt="Ilustrasi Login" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
