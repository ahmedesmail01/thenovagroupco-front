import { createLazyFileRoute } from "@tanstack/react-router";
import { Home, ChevronRight, CheckCircle2, HelpCircle, CreditCard } from "lucide-react";

export const Route = createLazyFileRoute("/_auth/billing/payment-methods")({
  component: PaymentMethodsPage,
});

function PaymentMethodsPage() {
  const paymentMethods = [
    {
      id: "1",
      type: "Credit Card",
      maskedNumber: "532212******7764",
      expiry: "2029-09",
      isDefault: true,
      brand: "mastercard", // We'll just use a generic icon for now
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
        <span className="font-semibold text-gray-900">Payment Methods</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Payment Methods</h1>
        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm text-sm font-medium text-gray-700">
          <CreditCard size={18} className="text-purple-600" />
          Hostinger balance: <span className="text-gray-900 font-bold">$0.00</span>
          <HelpCircle size={16} className="text-purple-600 cursor-pointer ml-1" />
        </div>
      </div>

      {/* Active Methods Alert */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
            <CheckCircle2 size={16} className="text-emerald-600" />
          </div>
          <span className="text-gray-700">
            You have <span className="font-bold text-gray-900">1 active</span> payment methods
          </span>
        </div>
        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap">
          Add payment method
        </button>
      </div>

      {/* Payment Method List */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 font-medium text-gray-900 bg-gray-50/50">
          Payment method list
        </div>
        <div className="divide-y divide-gray-100">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-8 bg-gray-900 rounded flex items-center justify-center shrink-0">
                  {/* Fake Mastercard Logo */}
                  <div className="flex">
                    <div className="w-4 h-4 rounded-full bg-red-500 opacity-80 mix-blend-multiply" />
                    <div className="w-4 h-4 rounded-full bg-yellow-500 opacity-80 mix-blend-multiply -ml-1.5" />
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {method.maskedNumber}
                  </div>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-sm text-gray-500">{method.type}</span>
                    <span className="text-gray-300">|</span>
                    <span className="text-sm text-gray-500">Expires {method.expiry}</span>
                    {method.isDefault && (
                      <>
                        <span className="text-gray-300">|</span>
                        <span className="text-xs font-semibold px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                          DEFAULT METHOD
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <button className="text-purple-600 hover:text-purple-800 transition-colors self-end sm:self-center">
                <ChevronRight size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
