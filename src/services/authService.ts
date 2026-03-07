import api from './api';
import type { LoginRequest, RegisterRequest, ApiResponse, LoginResponse } from '../types/auth';

export const authService = {
  login: async (data: LoginRequest) => {
    const response = await api.post<ApiResponse<LoginResponse>>('/login', data);
    return response.data;
  },

  register: async (data: RegisterRequest) => {
    const response = await api.post<ApiResponse<null>>('/registration', data);
    return response.data;
  },
};
