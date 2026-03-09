# SIMS PPOB - Fairuz Akhdan

Aplikasi web untuk sistem pembayaran online (PPOB) yang dibangun dengan React + TypeScript + Vite dan Redux Toolkit untuk state management.

## 🚀 Fitur

- **Authentication**
  - Registrasi akun baru
  - Login dengan validasi
  - Logout dengan clear session

- **Profile Management**
  - Lihat profile user
  - Update data profile (nama depan & belakang)
  - Update profile picture (max 100KB)

- **Saldo & Transaksi**
  - Lihat saldo (toggle show/hide, persistent)
  - Top up saldo (min 10.000, max 1.000.000)
  - Pembayaran layanan
  - Riwayat transaksi dengan pagination

## 🛠️ Tech Stack

- **Frontend Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **State Management:** Redux Toolkit
- **Routing:** React Router v7
- **Form Handling:** React Hook Form
- **HTTP Client:** Axios
- **Styling:** Tailwind CSS
- **Icons:** React Icons
- **Date Formatting:** date-fns

## 📁 Struktur Project

```
src/
├── components/
│   ├── elements/        # Komponen reusable (Button, Input, Card, dll)
│   ├── fragments/       # Komponen fragment (Form, List, dll)
│   ├── layouts/         # Layout wrapper (AuthLayout, MainLayout)
│   └── pages/           # Halaman utama
├── store/               # Redux store & slices
│   ├── authSlice.ts     # Auth state management
│   ├── profileSlice.ts  # Profile state management
│   ├── balanceSlice.ts  # Balance state management
│   ├── hooks.ts         # Typed Redux hooks
│   └── index.ts         # Store configuration
├── services/            # API services
├── types/               # TypeScript types
└── assets/              # Images & static files
```

## 🔧 Installation

1. Clone repository
```bash
git clone <repository-url>
cd sims-ppob-fairuz-akhdan
```

2. Install dependencies
```bash
npm install
```

3. Run development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

## 🎯 Redux State Management

### Auth Slice
- **State:** `token`, `isAuthenticated`, `loading`
- **Actions:** `login()`, `register()`, `logout()`
- **Usage:** Authentication flow, protected routing

### Profile Slice
- **State:** `data` (user profile), `loading`, `error`
- **Actions:** `fetchProfile()`, `updateProfile()`, `updateProfileImage()`, `clearProfile()`
- **Usage:** Display & update user information

### Balance Slice
- **State:** `amount`, `showBalance`, `loading`, `error`
- **Actions:** `fetchBalance()`, `toggleShowBalance()`, `clearBalance()`
- **Usage:** Display balance, auto-refresh after transactions

## 📝 Validasi Form

Semua form menggunakan **React Hook Form** dengan validasi:
- Email: Format email valid
- Password: Minimal 8 karakter
- Nama: Required fields
- Top Up: Min 10.000, Max 1.000.000
- Profile Image: Max 100KB, format JPEG/PNG

## 🔐 API Integration

Base URL: `https://take-home-test-api.nutech-integrasi.com`

### Endpoints:
- `POST /registration` - Registrasi user
- `POST /login` - Login user
- `GET /profile` - Get profile data
- `PUT /profile/update` - Update profile data
- `PUT /profile/image` - Update profile image
- `GET /balance` - Get balance
- `POST /topup` - Top up balance
- `GET /services` - Get service list
- `POST /transaction` - Create transaction
- `GET /transaction/history` - Get transaction history
- `GET /banner` - Get banner list

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: `md` (768px)
- Responsive navbar dengan hamburger menu
- Adaptive text & image sizes

## ✨ Best Practices

- ✅ Redux Toolkit untuk state management
- ✅ TypeScript untuk type safety
- ✅ Component-based architecture
- ✅ Reusable components
- ✅ Centralized API handling
- ✅ Error handling & notifications
- ✅ Loading states
- ✅ Form validation
- ✅ Protected routes
- ✅ Clean code structure

## 👨‍💻 Developer

**Fairuz Akhdan**

---

Built with ❤️ using React + TypeScript + Redux Toolkit
