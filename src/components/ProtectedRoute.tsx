import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function ProtectedRoute() {
  const { status } = useAuth();

  if (status === 'carregando') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <p className="text-tertiary-500 text-sm">Carregando...</p>
      </div>
    );
  }

  if (status === 'nao-autenticado') {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}