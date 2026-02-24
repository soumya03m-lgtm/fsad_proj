import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function ProtectedRoute() {
  const { isAuthenticated, bootstrapping } = useAuth();
  if (bootstrapping) {
    return <div className="p-6 text-sm text-slate-500">Restoring session...</div>;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
