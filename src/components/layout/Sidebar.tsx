import { Home, PlusSquare, UserPlus, Users, Calendar, Settings, Clock, Upload, X ,Trophy,WandSparkles, Database } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { title: 'Home', icon: Home, path: '/admin' },
  { title: 'Upload Result', icon: Upload, path: '/admin/upload-result' },
  { title: 'Add Market', icon: PlusSquare, path: '/admin/add-market' },
  { title: 'Add Final Ank', icon: Trophy , path: '/admin/add-final-ank' },
  { title: 'User Register', icon: UserPlus, path: '/admin/user-register' },
  { title: 'Add User Market', icon: Users, path: '/admin/add-user-market' },
  { title: 'Market Holiday', icon: Calendar, path: '/admin/market-holiday' },
 
  // { title: 'Add Time', icon: Clock, path: '/admin/add-time' },

  // { title: 'Settings', icon: Settings, path: '/admin/settings' },
  { title: 'Free Fix', icon: WandSparkles, path: '/admin/free-fix' },
  { title: 'Add Time Main Star Line', icon: Clock, path: '/admin/add-time-mainstarline' },
  { title: 'Upload result of Main Star Line', icon: Upload, path: '/admin/upload-mainstarline-result' },
  { title: 'Database Management', icon: Database, path: '/admin/database' },
];

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border z-50 transition-transform duration-300 ease-in-out",
          "w-64 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 lg:hidden text-sidebar-foreground hover:text-sidebar-primary"
        >
          <X size={24} />
        </button>

        {/* Admin Profile */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12 bg-primary">
              <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                AD
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold text-sidebar-foreground">Welcome,</p>
              <p className="text-lg font-bold text-sidebar-primary">Admin</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
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
