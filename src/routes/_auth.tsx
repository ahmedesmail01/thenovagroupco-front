import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import { useAuthStore } from "../features/auth/useAuthStore";
import { NavbarAuth } from "../components/layout/NavbarAuth";

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
  return (
    <>
      <NavbarAuth />
      <Outlet />
    </>
  );
}
