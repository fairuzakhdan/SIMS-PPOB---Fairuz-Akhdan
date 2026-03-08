# SIMS PPOB - FAIRUZ AKHDAN

Aplikasi PPOB (Payment Point Online Bank) dengan fitur login dan registrasi.

## Struktur Folder (Atomic Design)

```
src/
├── components/
│   ├── elements/       # Komponen dasar (Button, Input)
│   ├── fragments/      # Kombinasi elements (LoginForm, RegisterForm)
│   ├── layouts/        # Layout wrapper (AuthLayout)
│   └── pages/          # Halaman lengkap (LoginPage, RegisterPage)
├── services/           # API services
├── types/              # TypeScript types
└── utils/              # Helper functions
```

## Fitur

- ✅ Login dengan validasi email & password (min 8 karakter)
- ✅ Register dengan validasi form
- ✅ Bearer token authentication
- ✅ Responsive layout dengan ilustrasi di kanan

## Tech Stack

- React 19 + TypeScript
- Vite
- React Hook Form (form handling)
- Axios (HTTP client)
- React Router DOM (routing)

## API Endpoints

- Base URL: `https://take-home-test-api.nutech-integrasi.com`
- POST `/registration` - Register user baru
- POST `/login` - Login dan dapatkan JWT token

## Cara Menjalankan

```bash
npm install
npm run dev
```

## Struktur Atomic Design

### Elements
Komponen UI paling dasar yang tidak bisa dipecah lagi:
- `Input.tsx` - Input field dengan label dan error message
- `Button.tsx` - Button dengan variant primary/secondary

### Fragments
Kombinasi dari beberapa elements:
- `LoginForm.tsx` - Form login dengan validasi
- `RegisterForm.tsx` - Form register dengan validasi

### Layouts
Template layout untuk halaman:
- `AuthLayout.tsx` - Layout untuk halaman auth (split screen dengan ilustrasi)

### Pages
Halaman lengkap yang siap dirender:
- `LoginPage.tsx` - Halaman login
- `RegisterPage.tsx` - Halaman register
- `DashboardPage.tsx` - Halaman dashboard (placeholder)

## Validasi Form

### Login & Register
- Email: Format email valid
- Password: Minimal 8 karakter
- First Name & Last Name: Required (register only)

## Token Management

Token JWT disimpan di localStorage dan otomatis ditambahkan ke header Authorization untuk setiap request yang memerlukan autentikasi.
