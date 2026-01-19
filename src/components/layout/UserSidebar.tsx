import { Home, Upload, Settings, WandSparkles, X } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { title: 'Home', icon: Home, path: '/user' },
  { title: 'Upload Result', icon: Upload, path: '/user/upload-result' },
  { title: 'Free Fix', icon: WandSparkles, path: '/user/free-fix' },
 
];

export const UserSidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { userUsername } = useAuth();
  const name = userUsername ?? 'User';
  const initials = name
    .split(' ')
    .map((s) => s[0]?.toUpperCase())
    .slice(0, 2)
    .join('') || 'US';
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border z-50 transition-transform duration-300 ease-in-out",
          "w-64 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 lg:hidden text-sidebar-foreground hover:text-sidebar-primary"
        >
          <X size={24} />
        </button>
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 bg-primary">
              <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold text-sidebar-foreground">Welcome,</p>
              <p className="text-lg font-bold text-sidebar-primary">{name}</p>
            </div>
          </div>
        </div>
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/user'}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              activeClassName="bg-sidebar-accent text-sidebar-primary font-semibold border-l-4 border-sidebar-active"
              onClick={() => {
                if (window.innerWidth < 1024) onClose();
              }}
            >
              <item.icon size={20} />
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};