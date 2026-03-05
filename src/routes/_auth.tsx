import { useState } from "react";
import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import { useAuthStore } from "../features/auth/useAuthStore";
import { Sidebar } from "../components/layout/Sidebar";
import { AuthNavbar } from "../components/layout/AuthNavbar";
import { cn } from "../lib/utils";

export const Route = createFileRoute("/_auth")({
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-dash-bg flex">
      {/* Sidebar */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main Content */}
      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-300",
          isCollapsed ? "pl-20" : "pl-64",
        )}
      >
        <AuthNavbar />
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
