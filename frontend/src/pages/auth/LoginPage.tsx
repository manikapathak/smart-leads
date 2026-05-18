import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { loginSchema, type LoginInput } from '../../schemas/auth.schema';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../hooks/useAuth';

export default function LoginPage() {
  const { loginMutation } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-surface-950 flex-col justify-between p-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, #6366f1 0%, transparent 50%), radial-gradient(circle at 80% 20%, #818cf8 0%, transparent 40%)`,
            }}
          />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-white text-base">LeadFlow</span>
          </div>
        </div>
        <div className="relative z-10">
          <blockquote className="text-xl font-medium text-white/90 leading-relaxed">
            "The best CRM experience we've had. Clean, fast, and actually a joy to use."
          </blockquote>
          <div className="mt-6 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brand-400 flex items-center justify-center text-white font-semibold text-sm">A</div>
            <div>
              <p className="text-sm font-medium text-white">Aryan Mehta</p>
              <p className="text-xs text-white/40">Head of Sales, TechCorp</p>
            </div>
          </div>
        </div>
        <p className="relative z-10 text-xs text-white/25">© 2025 LeadFlow. All rights reserved.</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-surface-50">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <div className="lg:hidden flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-slate-800 text-base">LeadFlow</span>
            </div>
            <h1 className="text-2xl font-semibold text-slate-800">Welcome back</h1>
            <p className="mt-1 text-sm text-slate-500">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit((d) => loginMutation.mutate(d))} className="space-y-4">
            <Input
              label="username"
              type="username"
              placeholder="username"
              error={errors.username?.message}
              {...register('username')}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register('password')}
            />

            <div className="pt-1">
              <Button
                type="submit"
                className="w-full"
                loading={loginMutation.isPending}
                size="lg"
              >
                Sign in
              </Button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-brand-600 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
