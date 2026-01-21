import { useEffect, useMemo, useState } from 'react';
import { UserSidebar } from './UserSidebar';
import { TopBar } from './TopBar';
import { useNavigate } from 'react-router-dom';
import { useUserProfile } from '@/hooks/user/useUserProfile';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const userPageTitles: Record<string, string> = {
  '/user': 'Dashboard',
  '/user/upload-result': 'Upload Result',
  '/user/free-fix': 'Free Fix',
  '/user/settings': 'Settings',
};

export const UserDashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const userId = useMemo(() => {
    try {
      const saved = localStorage.getItem('user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.id) return parsed.id as number;
      }
    } catch {
      return undefined;
    }
    return undefined;
  }, []);

  const profileQuery = useUserProfile(userId);

  useEffect(() => {
    const u = profileQuery.data?.data?.user;
    if (!u) return;
    if (u.exists === false || u.is_active === 0) {
      localStorage.removeItem('isUserAuthenticated');
      localStorage.removeItem('userUsername');
      localStorage.removeItem('user');
      navigate('/user/login', { replace: true });
    }
  }, [profileQuery.data, navigate]);

  return (
    <div className="min-h-screen w-full bg-background">
      <UserSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:ml-64 min-h-screen">
        <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} pageTitles={userPageTitles} />
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
};