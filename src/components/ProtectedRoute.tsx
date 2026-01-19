import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: 'admin' | 'user';
}

export const ProtectedRoute = ({ children, role = 'admin' }: ProtectedRouteProps) => {
  const { isAuthenticated, isUserAuthenticated, ready } = useAuth();
  const authed = role === 'admin' ? isAuthenticated : isUserAuthenticated;

  if (!ready) {
    return <></>;
  }

  if (!authed) {
    return <Navigate to={role === 'admin' ? '/admin/dashboard_smboss_login' : '/user/login'} replace />;
  }

  return <>{children}</>;
};
