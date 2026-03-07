import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { MdAlternateEmail } from 'react-icons/md';
import { AiOutlineLock, AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';
import Input from '../elements/Input';
import Button from '../elements/Button';
import { authService } from '../../services/authService';
import type { LoginRequest } from '../../types/auth';

export default function LoginForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setError } = useForm<LoginRequest>();
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data: LoginRequest) => {
    setErrorMessage('');
    try {
      const response = await authService.login(data);
      if (response.status === 0) {
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login gagal';
      setError('root', { message });
      setErrorMessage(message);
    }
  };

  const handleFormError = () => {
    if (errors.email) {
      setErrorMessage(errors.email.message || 'Email tidak valid');
    } else if (errors.password) {
      setErrorMessage(errors.password.message || 'Password tidak valid');
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Masuk atau buat akun<br />untuk memulai
          </h2>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit, handleFormError)}>
          <Input
            type="email"
            placeholder="masukan email anda"
            icon={<MdAlternateEmail size={20} />}
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
            type="password"
            placeholder="masukan password anda"
            icon={<AiOutlineLock size={20} />}
            {...register('password', {
              required: 'Password wajib diisi',
              minLength: {
                value: 8,
                message: 'Password minimal 8 karakter',
              },
            })}
            error={errors.password?.message}
          />

          <Button type="submit" className="mt-4">Masuk</Button>

          <p className="text-center text-gray-600 text-sm mt-6">
            belum punya akun? registrasi{' '}
            <Link to="/register" className="text-red-500 font-semibold hover:text-red-600">
              di sini
            </Link>
          </p>
        </form>
      </div>

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
