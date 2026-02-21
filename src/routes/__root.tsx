import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { NotFoundPage } from "../components/NotFoundPage";
import { useAuthStore } from "../features/auth/useAuthStore";
import { NavbarAuth } from "../components/layout/NavbarAuth";

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
});

function RootLayout() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <div className="min-h-screen bg-brand-navy text-text-primary flex flex-col font-sans">
      {/* Show NavbarAuth when logged in, public Navbar when logged out */}
      {isAuthenticated ? <NavbarAuth /> : <Navbar />}

      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      <Footer />

      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
}
