import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { BillingSidebar } from "../../components/billing/BillingSidebar";

export const Route = createFileRoute("/_auth/billing")({
  beforeLoad: ({ location }) => {
    // Redirect to subscriptions if exactly at /billing
    if (location.pathname === "/billing") {
      throw redirect({
        to: "/billing/subscriptions",
        replace: true,
      });
    }
  },
  component: BillingLayout,
});

function BillingLayout() {
  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-white rounded-2xl shadow-sm border border-dash-border/50 overflow-hidden">
      <BillingSidebar />
      <main className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
