import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/auth.store';
import { authService } from '../services/auth.service';
import type { LoginPayload, RegisterPayload } from '../types/auth.types';

export function useAuth() {
  const { user, token, isAuthenticated, login, logout } = useAuthStore();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: (data) => {
      login(data.user, data.token);
      toast.success(`Welcome back, ${data.user.name}!`);
      navigate('/dashboard');
    },
    onError: (err: { response?: { data?: { message?: string } } }) => {
      toast.error(err.response?.data?.message || 'Login failed');
    },
  });

  const registerMutation = useMutation({
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
    onSuccess: (data) => {
      login(data.user, data.token);
      toast.success('Account created!');
      navigate('/dashboard');
    },
    onError: (err: { response?: { data?: { message?: string } } }) => {
      toast.error(err.response?.data?.message || 'Registration failed');
    },
  });

  const handleLogout = useCallback(() => {
    logout();
    navigate('/login');
    toast.success('Logged out');
  }, [logout, navigate]);

  return {
    user,
    token,
    isAuthenticated,
    isAdmin: user?.role === 'ADMIN',
    loginMutation,
    registerMutation,
    logout: handleLogout,
  };
}
