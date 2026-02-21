import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useAuthStore } from "../features/auth/useAuthStore";
import api from "../lib/api";
import { loginSchema } from "../features/auth/schemas";
import type { LoginSchema } from "../features/auth/schemas";

export const Route = createLazyFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const {
    mutate: loginMutation,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (data: LoginSchema) => api.post("/auth/login", data),
    onSuccess: (response) => {
      const { user, token } = response.data;
      login(user, token);
      navigate({ to: "/dashboard" });
    },
  });

  // Redirect if already logged in - called AFTER hooks
  if (isAuthenticated) {
    navigate({ to: "/dashboard" });
    return null;
  }

  return (
    <div className="min-h-screen bg-brand-navy flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link to="/">
            <div className="w-12 h-12 bg-brand-blue rounded-xl mx-auto mb-4 items-center justify-center text-white font-black text-2xl flex">
              N
            </div>
          </Link>
          <h1 className="text-3xl font-black text-white">Welcome Back</h1>
          <p className="text-text-secondary text-sm mt-2">
            Log in to access your Nova Group account
          </p>
        </div>

        {/* Card */}
        <div className="bg-brand-surface border border-brand-border rounded-2xl p-8 shadow-modal">
          {isError && (
            <div className="mb-5 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              Invalid email or password. Please try again.
            </div>
          )}

          <form
            onSubmit={handleSubmit((d) => loginMutation(d))}
            className="space-y-5"
          >
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              error={errors.email?.message}
              {...register("email")}
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                error={errors.password?.message}
                {...register("password")}
              />
              <button
                type="button"
                className="absolute right-3 top-[38px] text-text-secondary hover:text-white transition-colors text-sm"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-text-secondary hover:text-white transition-colors select-none">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-brand-blue rounded"
                  {...register("rememberMe")}
                />
                Remember me
              </label>
              <button
                type="button"
                className="text-brand-blue-light hover:underline font-medium"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base shadow-lg shadow-brand-blue/20"
              disabled={isPending}
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-brand-border" />
            </div>
            <div className="relative text-center">
              <span className="bg-brand-surface px-4 text-xs text-text-muted uppercase tracking-widest">
                Or
              </span>
            </div>
          </div>

          <p className="text-center text-sm text-text-secondary">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-white font-semibold hover:text-brand-blue-light transition-colors underline underline-offset-2"
            >
              Create Account →
            </Link>
          </p>
        </div>

        <p className="text-center mt-6 text-xs text-text-muted">
          <Link to="/" className="hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
