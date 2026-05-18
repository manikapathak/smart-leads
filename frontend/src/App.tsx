import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AppRoutes } from './routes/AppRoutes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: '#1e293b',
              color: '#f8fafc',
              fontSize: '13px',
              fontFamily: 'DM Sans, sans-serif',
              borderRadius: '10px',
              padding: '10px 14px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            },
            success: { iconTheme: { primary: '#34d399', secondary: '#1e293b' } },
            error: { iconTheme: { primary: '#f87171', secondary: '#1e293b' } },
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
