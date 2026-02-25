import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function ProtectedRoute({ allow }) {
  const { isAuthenticated, bootstrapping, role } = useAuth();
  const normalizedRole = role?.toLowerCase();
  if (bootstrapping) {
    return <div className="p-6 text-sm text-slate-500">Restoring session...</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  if (allow && normalizedRole !== allow) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
