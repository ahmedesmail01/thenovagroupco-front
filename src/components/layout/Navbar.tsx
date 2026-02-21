import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "../ui/Button";
import { useAuthStore } from "../../features/auth/useAuthStore";

export function Navbar() {
  const { setLoginModalOpen } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  // Suppress unused warning — kept for any legacy usage
  void setLoginModalOpen;

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-brand-navy/80 backdrop-blur-md border-b border-brand-border h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src="/logo.svg"
            alt="Nova Group"
            className="h-8 hidden sm:block"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="w-10 h-10 bg-brand-blue rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform">
            N
          </div>
          <span className="text-white font-bold tracking-widest hidden sm:inline">
            NOVA GROUP
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link
            to="/"
            className="text-text-secondary hover:text-white transition-colors [&.active]:text-white [&.active]:font-bold"
          >
            Home
          </Link>
          <Link
            to="/courses"
            className="text-text-secondary hover:text-white transition-colors [&.active]:text-white [&.active]:font-bold"
          >
            Courses
          </Link>
          <Link
            to="/about"
            className="text-text-secondary hover:text-white transition-colors [&.active]:text-white [&.active]:font-bold"
          >
            About
          </Link>
        </div>

        {/* Auth CTAs — now link to pages */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm" className="hover:bg-white/5">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button
              variant="primary"
              size="sm"
              className="shadow-lg shadow-brand-blue/20"
            >
              Sign up
            </Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-white hover:bg-white/5 rounded-lg transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5 flex flex-col items-end">
            <span
              className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? "w-6 translate-y-2 rotate-45" : "w-6"}`}
            />
            <span
              className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : "w-4"}`}
            />
            <span
              className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? "w-6 -translate-y-2 -rotate-45" : "w-5"}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden absolute top-16 left-0 right-0 bg-brand-navy/95 border-b border-brand-border overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="p-4 flex flex-col gap-2">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="text-text-secondary hover:text-white p-3 rounded-lg hover:bg-white/5 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/courses"
            onClick={() => setMenuOpen(false)}
            className="text-text-secondary hover:text-white p-3 rounded-lg hover:bg-white/5 transition-colors"
          >
            Courses
          </Link>
          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="text-text-secondary hover:text-white p-3 rounded-lg hover:bg-white/5 transition-colors"
          >
            About
          </Link>
          <hr className="border-brand-border my-1" />
          <div className="flex flex-col gap-2">
            <Link to="/register" onClick={() => setMenuOpen(false)}>
              <Button className="w-full">Sign up</Button>
            </Link>
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              <Button variant="outline" className="w-full">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
