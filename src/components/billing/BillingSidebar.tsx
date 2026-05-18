import { Link, useLocation } from "@tanstack/react-router";
import { Crown, History, WalletCards } from "lucide-react";
import { cn } from "../../lib/utils";

export function BillingSidebar() {
  const location = useLocation();

  const navItems = [
    {
      label: "Subscriptions",
      to: "/billing/subscriptions",
      icon: Crown,
    },
    {
      label: "Payment history",
      to: "/billing/payment-history",
      icon: History,
    },
    {
      label: "Payment methods",
      to: "/billing/payment-methods",
      icon: WalletCards,
    },
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0 p-4 border-b lg:border-b-0 lg:border-r border-dash-border/50 lg:min-h-[calc(100vh-80px)] overflow-x-auto no-scrollbar">
      <nav className="flex lg:flex-col gap-2">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                isActive
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon
                size={18}
                className={cn("shrink-0", isActive ? "text-gray-900" : "text-gray-500")}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
