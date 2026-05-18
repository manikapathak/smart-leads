import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Loader } from '../components/common/Loader';
import { ProtectedRoute } from './ProtectedRoute';
import { DashboardLayout } from '../components/layout/DashboardLayout';

// Lazy pages
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage'));
const DashboardPage = lazy(() => import('../pages/dashboard/DashboardPage'));
const LeadsListPage = lazy(() => import('../pages/dashboard/LeadsListPage'));
const CreateLeadPage = lazy(() => import('../pages/dashboard/CreateLeadPage'));
const EditLeadPage = lazy(() => import('../pages/dashboard/EditLeadPage'));
const LeadDetailsPage = lazy(() => import('../pages/dashboard/LeadDetailsPage'));

const PageLoader = () => <Loader fullPage text="Loading…" />;

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/leads" element={<LeadsListPage />} />
            <Route path="/dashboard/leads/create" element={<CreateLeadPage />} />
            <Route path="/dashboard/leads/:id" element={<LeadDetailsPage />} />
            <Route path="/dashboard/leads/:id/edit" element={<EditLeadPage />} />
          </Route>
        </Route>

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
}
