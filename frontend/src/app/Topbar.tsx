import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/hooks/useAuthStore';
import { authApi } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { getInitials } from '@/lib/utils';
import { NotificationBell } from '@/components/shared';

export function Topbar() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch {
      // ignore
    }
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border/50 bg-background/60 px-6 backdrop-blur-xl">
      <div />

      <div className="flex items-center gap-3">
        <NotificationBell />

        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
            {user ? getInitials(user.email) : '??'}
          </div>
          <div className="hidden flex-col sm:flex">
            <span className="text-sm font-medium">{user?.email}</span>
            <span className="text-xs text-muted-foreground">{user?.role}</span>
          </div>
        </div>

        <Button variant="ghost" size="icon" onClick={handleLogout}>
          <LogOut className="h-4.5 w-4.5 text-muted-foreground" />
        </Button>
      </div>
    </header>
  );
}
