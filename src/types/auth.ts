export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface LoginResponse {
  token: string;
}
