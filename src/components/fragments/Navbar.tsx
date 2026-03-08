import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "../elements/Logo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Logo />
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            <Link to="/topup" className="text-gray-700 hover:text-red-500 font-medium">
              Top Up
            </Link>
            <Link to="/transaction" className="text-gray-700 hover:text-red-500 font-medium">
              Transaction
            </Link>
            <Link to="/account" className="text-gray-700 hover:text-red-500 font-medium">
              Akun
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <div className="p-4">
          <button
            onClick={() => setIsOpen(false)}
            className="mb-8 text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="flex flex-col gap-6">
            <Link
              to="/topup"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-red-500 font-medium"
            >
              Top Up
            </Link>
            <Link
              to="/transaction"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-red-500 font-medium"
            >
              Transaction
            </Link>
            <Link
              to="/account"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-red-500 font-medium"
            >
              Akun
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        />
      )}
    </nav>
  );
};

export default Navbar;
