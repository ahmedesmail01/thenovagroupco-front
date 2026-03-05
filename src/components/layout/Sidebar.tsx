import { Link, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Network,
  Container,
  Wallet,
  History,
  CircleDollarSign,
  Trophy,
  Users,
  Zap,
  UserCircle,
  LifeBuoy,
  GraduationCap,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAuthStore } from "../../features/auth/useAuthStore";
import { cn } from "../../lib/utils";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

export function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  const logo = "/images/logo-gray.png";

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", to: "/dashboard" },
    { icon: Network, label: "Genealogy", to: "/genealogy" },
    { icon: Container, label: "Tank", to: "/tank" },
    { icon: Wallet, label: "Wallet", to: "/wallet" },
    { icon: History, label: "Transactions", to: "/transactions" },
    { icon: CircleDollarSign, label: "Commissions", to: "/commissions" },
    { icon: Trophy, label: "Rank Reward", to: "/rank-reward" },
    { icon: Users, label: "Membership", to: "/membership" },
    { icon: Zap, label: "NOVA PRO+", to: "/nova-pro" },
    { icon: UserCircle, label: "Profile", to: "/profile" },
    { icon: LifeBuoy, label: "Support", to: "/support" },
    { icon: GraduationCap, label: "NOVA School", to: "/school" },
  ];

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-full bg-dash-sidebar border-r border-dash-border transition-all duration-300 z-50 flex flex-col",
        isCollapsed ? "w-20 " : "w-64",
      )}
    >
      {/* Header */}
      <div className="h-16 flex items-center px-6 border-b border-dash-border justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2  w-full">
            <img src={logo} alt="Nova Group" className="w-30 mx-auto" />
            {/* <span className="font-bold text-dash-text tracking-tight">
              NOVA GROUP
            </span> */}
          </div>
        )}
        {isCollapsed && <img src={logo} alt="N" className="h-8" />}

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 bg-dash-sidebar border border-dash-border rounded-full p-1 text-dash-muted hover:text-dash-accent transition-colors shadow-sm"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto no-scrollbar">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group",
              "text-dash-muted hover:text-dash-accent hover:bg-dash-bg",
              "[&.active]:bg-dash-accent [&.active]:text-white [&.active]:shadow-lg [&.active]:shadow-dash-accent/20",
            )}
          >
            <item.icon size={20} className="shrink-0" />
            {!isCollapsed && (
              <span className="font-medium text-sm whitespace-nowrap">
                {item.label}
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-dash-border">
        <button
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors",
            isCollapsed ? "justify-center" : "",
          )}
        >
          <LogOut size={20} className="shrink-0" />
          {!isCollapsed && <span className="font-medium text-sm">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
