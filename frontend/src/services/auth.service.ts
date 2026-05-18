import api from '../api/axios';
import { ENDPOINTS } from '../api/endpoints';
import type { LoginPayload, RegisterPayload, AuthResponse } from '../types/auth.types';

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>(ENDPOINTS.LOGIN, payload);
    return data;
  },

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>(ENDPOINTS.REGISTER, payload);
    return data;
  },

  async getMe(): Promise<AuthResponse['user']> {
    const { data } = await api.get(ENDPOINTS.ME);
    return data.user ?? data;
  },
};
