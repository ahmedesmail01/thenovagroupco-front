import { createLazyFileRoute } from "@tanstack/react-router";
import { Home, ChevronRight, CheckSquare } from "lucide-react";
import { useState } from "react";

export const Route = createLazyFileRoute("/_auth/billing/payment-history")({
  component: PaymentHistoryPage,
});

function PaymentHistoryPage() {
  const [activeTab, setActiveTab] = useState("payment");

  const payments = [
    {
      paymentId: "H_34918478",
      subscriptionId: "AzZPWOV6DmooV1zLb",
      serviceTitle: "KVM 2",
      serviceSubtitle: "srv1217280.hstgr.cloud",
      paidAt: "2025-12-23",
      amount: "$116.14",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
        <Home size={16} />
        <ChevronRight size={16} className="text-gray-400" />
        <span>Billing</span>
        <ChevronRight size={16} className="text-gray-400" />
        <span>Payment History</span>
        <ChevronRight size={16} className="text-gray-400" />
        <span className="font-semibold text-gray-900">Paid</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900">Payment History</h1>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-6 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("payment")}
            className={`py-4 px-2 font-medium text-sm transition-colors relative ${activeTab === "payment"
              ? "text-dash-accent"
              : "text-gray-500 hover:text-gray-900"
              }`}
          >
            Payment history
            {activeTab === "payment" && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-dash-accent" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("refund")}
            className={`py-4 px-6 font-medium text-sm transition-colors relative ${activeTab === "refund"
              ? "text-dash-accent"
              : "text-gray-500 hover:text-gray-900"
              }`}
          >
            Refund history
            {activeTab === "refund" && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-dash-accent" />
            )}
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600 min-w-max">
            <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 w-12">
                  <div className="w-4 h-4 rounded border border-gray-300" />
                </th>
                <th className="px-6 py-4">Payment ID</th>
                <th className="px-6 py-4">Subscription ID</th>
                <th className="px-6 py-4">Service</th>
                <th className="px-6 py-4">Paid at</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {activeTab === "payment" ? (
                payments.map((payment, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-4 h-4 rounded border border-gray-300" />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {payment.paymentId}
                    </td>
                    <td className="px-6 py-4 text-dash-accent font-medium">
                      {payment.subscriptionId}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">
                        {payment.serviceTitle}
                      </div>
                      <div className="text-gray-500 text-xs mt-0.5">
                        {payment.serviceSubtitle}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {payment.paidAt}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {payment.amount}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-dash-accent hover:text-purple-800 transition-colors">
                        <ChevronRight size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No refund history found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
