import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/hooks/useAuthStore';
import { useUIStore } from '@/hooks/useUIStore';
import { Role } from '@/types';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Building2,
  Truck,
  Container,
  CalendarClock,
  ClipboardList,
  DollarSign,
  ScanLine,
  Bot,
  ShieldCheck,
  AlertTriangle,
  FileWarning,
  QrCode,
  History,
  Anchor,
  ChevronLeft,
  ChevronRight,
  Settings,
  FileSearch,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

const adminNav: NavItem[] = [
  { label: 'Overview', path: '/app/admin/overview', icon: LayoutDashboard },
  { label: 'Port Builder', path: '/app/admin/port-builder', icon: Building2 },
];

const carrierNav: NavItem[] = [
  { label: 'Dashboard', path: '/app/carrier/dashboard', icon: LayoutDashboard },
  { label: 'Trucks', path: '/app/carrier/trucks', icon: Truck },
  { label: 'Containers', path: '/app/carrier/containers', icon: Container },
  { label: 'Slots', path: '/app/carrier/slots', icon: CalendarClock },
  { label: 'Bookings', path: '/app/carrier/bookings', icon: ClipboardList },
  { label: 'Charges', path: '/app/carrier/charges', icon: DollarSign },
  { label: 'OCR Upload', path: '/app/carrier/ocr', icon: FileSearch },
  { label: 'AI Assistant', path: '/app/carrier/assistant', icon: Bot },
];

const operatorNav: NavItem[] = [
  {
    label: 'Dashboard',
    path: '/app/operator/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Pending',
    path: '/app/operator/bookings/pending',
    icon: ClipboardList,
  },
  {
    label: 'Confirmed',
    path: '/app/operator/bookings/confirmed',
    icon: CalendarClock,
  },
  {
    label: 'Containers',
    path: '/app/operator/operations/containers',
    icon: Container,
  },
  { label: 'Risk', path: '/app/operator/risk', icon: ShieldCheck },
  { label: 'Penalties', path: '/app/operator/penalties', icon: FileWarning },
  { label: 'Alerts', path: '/app/operator/alerts', icon: AlertTriangle },
  { label: 'AI Assistant', path: '/app/operator/assistant', icon: Bot },
];

const gateNav: NavItem[] = [
  { label: 'Scan', path: '/app/gate/scan', icon: QrCode },
  { label: 'History', path: '/app/gate/history', icon: History },
];

function getNavItems(role: Role): NavItem[] {
  switch (role) {
    case Role.PORT_ADMIN:
      return adminNav;
    case Role.CARRIER:
      return carrierNav;
    case Role.TERMINAL_OPERATOR:
      return operatorNav;
    case Role.GATE_AGENT:
      return gateNav;
    default:
      return [];
  }
}

function getRoleLabel(role: Role): string {
  switch (role) {
    case Role.PORT_ADMIN:
      return 'Admin';
    case Role.CARRIER:
      return 'Carrier';
    case Role.TERMINAL_OPERATOR:
      return 'Operator';
    case Role.GATE_AGENT:
      return 'Gate Agent';
  }
}

export function Sidebar() {
  const user = useAuthStore((s) => s.user);
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const location = useLocation();

  if (!user) return null;

  const navItems = getNavItems(user.role);

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarOpen ? 256 : 72 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-sidebar-border bg-sidebar"
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 px-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/20">
          <Anchor className="h-5 w-5 text-primary" />
        </div>
        <AnimatePresence>
          {sidebarOpen && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="overflow-hidden whitespace-nowrap text-lg font-bold gradient-text"
            >
              PORTFLOW AI
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <Separator className="opacity-50" />

      {/* Role Badge */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-4 py-3"
          >
            <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2">
              <Settings className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">
                {getRoleLabel(user.role)}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-2">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path !== '/app/carrier/bookings' &&
                location.pathname.startsWith(item.path));

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary/15 text-primary'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-lg bg-primary/10 ring-1 ring-primary/20"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon
                  className={cn(
                    'relative z-10 h-4.5 w-4.5 shrink-0',
                    isActive && 'text-primary',
                  )}
                />
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="relative z-10 overflow-hidden whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </NavLink>
            );
          })}
        </nav>
      </ScrollArea>

      <Separator className="opacity-50" />

      {/* Toggle */}
      <button
        onClick={toggleSidebar}
        className="flex h-12 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
      >
        {sidebarOpen ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>
    </motion.aside>
  );
}
