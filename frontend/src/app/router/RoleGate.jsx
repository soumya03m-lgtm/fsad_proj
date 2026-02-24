import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function RoleGate({ allow }) {
  const { user } = useAuth();
  return allow.includes(user?.role) ? <Outlet /> : <Navigate to="/unauthorized" replace />;
}
