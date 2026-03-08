import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import DashboardPage from './components/pages/DashboardPage';
import TopUpPage from './components/pages/TopUpPage';
import PurchasePage from './components/pages/PurchasePage';
import TransactionPage from './components/pages/TransactionPage';
import NotFoundPage from './components/pages/NotFoundPage';

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

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
        <Route path="*" element={isAuthenticated ? <NotFoundPage /> : <Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
