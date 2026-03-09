import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppSelector } from './store/hooks';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import DashboardPage from './components/pages/DashboardPage';
import TopUpPage from './components/pages/TopUpPage';
import PurchasePage from './components/pages/PurchasePage';
import TransactionPage from './components/pages/TransactionPage';
import AccountPage from './components/pages/AccountPage';
import NotFoundPage from './components/pages/NotFoundPage';

function App() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />} 
        />
        <Route 
          path="/register" 
          element={isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage />} 
        />
        <Route 
          path="/" 
          element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/topup" 
          element={isAuthenticated ? <TopUpPage /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/purchase/:serviceCode" 
          element={isAuthenticated ? <PurchasePage /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/transaction" 
          element={isAuthenticated ? <TransactionPage /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/account" 
          element={isAuthenticated ? <AccountPage /> : <Navigate to="/login" replace />} 
        />
        <Route path="*" element={isAuthenticated ? <NotFoundPage /> : <Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
