import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { registerSchema, type RegisterInput } from '../../schemas/auth.schema';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';
import type { RegisterPayload } from '../../types/auth.types';

const roleOptions = [
  { label: 'Sales Rep', value: 'SALES' },
  { label: 'Administrator', value: 'ADMIN' },
];

export default function RegisterPage() {
  const { registerMutation } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: 'SALES' },
  });

  const onSubmit = (data: RegisterInput) => {
    registerMutation.mutate(data as RegisterPayload);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50 p-6">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-slate-800 text-base">LeadFlow</span>
          </div>
          <h1 className="text-2xl font-semibold text-slate-800">Create an account</h1>
          <p className="mt-1 text-sm text-slate-500">Get started with LeadFlow today</p>
        </div>

        <div className="card p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Jane Smith"
              autoComplete="name"
              error={errors.name?.message}
              {...register('name')}
            />
            <Input
              label="Email"
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
              error={errors.email?.message}
              {...register('email')}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              error={errors.password?.message}
              {...register('password')}
            />
            <Select
              label="Role"
              options={roleOptions}
              error={errors.role?.message}
              {...register('role')}
            />

            <div className="pt-1">
              <Button
                type="submit"
                className="w-full"
                loading={registerMutation.isPending}
                size="lg"
              >
                Create Account
              </Button>
            </div>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-600 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
