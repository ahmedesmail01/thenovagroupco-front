import { createLazyFileRoute } from "@tanstack/react-router";
import { Home, ChevronRight, CheckSquare } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import api from "../../../lib/api";

export const Route = createLazyFileRoute("/_auth/billing/payment-history")({
  component: PaymentHistoryPage,
});

interface PaymentHistoryItem {
  id: number;
  user_id: number;
  subscription_code: string;
  payment_code: string;
  payment_method: string;
  amount: string;
  payment_date: string;
  created_at: string;
  updated_at: string;
}

interface PaymentHistoryResponse {
  status: string;
  data: PaymentHistoryItem[];
}

function PaymentHistoryPage() {
  const [activeTab, setActiveTab] = useState("payment");
  const [payments, setPayments] = useState<PaymentHistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getPayments = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get<PaymentHistoryResponse>("/payment-history");
      if (res.data?.status === "success") {
        setPayments(res.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getPayments();
  }, [getPayments]);

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
          {/* <button
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
          </button> */}
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
                <th className="px-6 py-4">Payment Method</th>
                <th className="px-6 py-4">Paid at</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                Array.from({ length: 3 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-28 animate-pulse" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-36 animate-pulse" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-8 h-8 bg-gray-100 rounded-full animate-pulse ml-auto" />
                    </td>
                  </tr>
                ))
              ) : activeTab === "payment" ? (
                payments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <div className="p-3 bg-gray-50 rounded-full text-gray-400">
                          <CheckSquare size={24} />
                        </div>
                        <p className="text-sm font-medium text-gray-900">No transactions found</p>
                        <p className="text-xs text-gray-500 max-w-xs mx-auto">
                          We couldn't find any payment history records for your account.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  payments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="w-4 h-4 rounded border border-gray-300" />
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {payment.payment_code}
                      </td>
                      <td className="px-6 py-4 text-dash-accent font-medium">
                        {payment.subscription_code}
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        {payment.payment_method}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {payment.payment_date}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        ${parseFloat(payment.amount).toFixed(2)}
                      </td>
                      {/* <td className="px-6 py-4 text-right">
                        <button className="text-dash-accent hover:text-purple-800 transition-colors">
                          <ChevronRight size={20} />
                        </button>
                      </td> */}
                    </tr>
                  ))
                )
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
