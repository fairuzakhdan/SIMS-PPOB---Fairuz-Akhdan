import type { ReactNode } from 'react';
import Logo from '../elements/Logo';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 md:p-8">
      <div className="w-full md:w-[90%] lg:w-[70%] max-h-[90vh] md:h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-6 py-8 md:px-16 md:py-0 relative">
          <div className="mb-6 md:mb-8">
            <Logo clickable={false} />
          </div>
          <div className="w-full max-w-[380px]">
            {children}
          </div>
        </div>
        <div className="hidden md:block md:w-1/2 relative">
          <img 
            src={new URL('../../assets/images/ilustrasi-login.png', import.meta.url).href}
            alt="Ilustrasi Login" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
