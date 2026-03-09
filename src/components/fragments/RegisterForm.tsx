import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { MdAlternateEmail } from 'react-icons/md';
import { AiOutlineLock, AiOutlineUser, AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { register as registerAction } from '../../store/authSlice';
import Input from '../elements/Input';
import Button from '../elements/Button';
import type { RegisterRequest } from '../../types/auth';

interface RegisterFormData extends RegisterRequest {
  confirm_password: string;
}

export default function RegisterForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState: { errors }, watch, setError } = useForm<RegisterFormData>();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: RegisterFormData) => {
    setErrorMessage('');
    if (data.password !== data.confirm_password) {
      return;
    }

    setLoading(true);
    try {
      const { confirm_password, ...registerData } = data;
      await dispatch(registerAction(registerData)).unwrap();
      setSuccessMessage('Registrasi berhasil! Silahkan login');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error: any) {
      const message = typeof error === 'string' ? error : 'Registrasi gagal';
      setError('root', { message });
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full mb-12">
        <div className="text-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Lengkapi data untuk<br />membuat akun
          </h2>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            placeholder="masukan email anda"
            icon={<MdAlternateEmail size={18} />}
            {...register('email', {
              required: 'Email wajib diisi',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Parameter email tidak sesuai format',
              },
            })}
            error={errors.email?.message}
          />

          <Input
            type="text"
            placeholder="nama depan"
            icon={<AiOutlineUser size={18} />}
            {...register('first_name', { required: 'Nama depan wajib diisi' })}
            error={errors.first_name?.message}
          />

          <Input
            type="text"
            placeholder="nama belakang"
            icon={<AiOutlineUser size={18} />}
            {...register('last_name', { required: 'Nama belakang wajib diisi' })}
            error={errors.last_name?.message}
          />

          <Input
            type="password"
            placeholder="buat password"
            icon={<AiOutlineLock size={18} />}
            {...register('password', {
              required: 'Password wajib diisi',
              minLength: {
                value: 8,
                message: 'Password minimal 8 karakter',
              },
            })}
            error={errors.password?.message}
          />

          <Input
            type="password"
            placeholder="konfirmasi password"
            icon={<AiOutlineLock size={18} />}
            {...register('confirm_password', {
              required: 'Konfirmasi password wajib diisi',
              validate: (value) => value === watch('password') || 'Password tidak sama',
            })}
            error={errors.confirm_password?.message}
          />

          <Button type="submit" disabled={loading} className="mt-3">
            {loading ? 'Loading...' : 'Registrasi'}
          </Button>

          <p className="text-center text-gray-600 text-xs mt-4">
            sudah punya akun? login{' '}
            <Link to="/login" className="text-red-500 font-semibold hover:text-red-600">
              di sini
            </Link>
          </p>
        </form>
      </div>

      {successMessage && (
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-green-50 border border-green-200 rounded-md px-2 py-1.5">
          <span className="text-green-600" style={{ fontSize: '10px' }}>{successMessage}</span>
          <button
            type="button"
            onClick={() => setSuccessMessage('')}
            className="text-green-600 hover:text-green-800 ml-2"
          >
            <AiOutlineClose size={12} />
          </button>
        </div>
      )}

      {errorMessage && (
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-red-50 border border-red-200 rounded-md px-2 py-1.5">
          <span className="text-red-600" style={{ fontSize: '10px' }}>{errorMessage}</span>
          <button
            type="button"
            onClick={() => setErrorMessage('')}
            className="text-red-600 hover:text-red-800 ml-2"
          >
            <AiOutlineClose size={12} />
          </button>
        </div>
      )}
    </>
  );
}
