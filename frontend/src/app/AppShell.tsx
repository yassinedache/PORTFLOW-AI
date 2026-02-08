import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { useUIStore } from '@/hooks/useUIStore';
import { cn } from '@/lib/utils';

export function AppShell() {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);

  return (
    <div className="gradient-bg flex min-h-screen">
      <Sidebar />
      <motion.div
        className={cn('flex flex-1 flex-col transition-all duration-300')}
        style={{ marginLeft: sidebarOpen ? 256 : 72 }}
      >
        <Topbar />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </motion.div>
    </div>
  );
}
