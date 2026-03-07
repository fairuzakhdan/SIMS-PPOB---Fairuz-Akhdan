export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-600 mb-6">Selamat datang! Anda berhasil login.</p>
      <button 
        onClick={() => {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }}
        className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
