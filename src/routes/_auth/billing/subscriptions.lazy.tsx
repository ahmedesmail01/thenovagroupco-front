import { createLazyFileRoute } from "@tanstack/react-router";
import { Home, ChevronRight, Search, Info } from "lucide-react";

export const Route = createLazyFileRoute("/_auth/billing/subscriptions")({
  component: SubscriptionsPage,
});

function SubscriptionsPage() {
  const subscriptions = [
    {
      id: "KVM 2",
      domain: "srv1217280.hstgr.cloud",
      expirationDate: "2026-12-23",
      autoRenewal: true,
      renewalPrice: "$203.88",
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
        <span className="font-semibold text-gray-900">Subscriptions</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900">Subscriptions</h1>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {/* Search Bar */}
        <div className="p-4 border-b border-gray-100">
          <div className="relative max-w-2xl">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-colors"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600 min-w-max">
            <thead className="bg-gray-50/50 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-2">
                    Subscription
                    <span className="text-xs">↓↑</span>
                  </div>
                </th>
                <th className="px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-2">
                    Expiration date
                    <span className="text-xs">↓↑</span>
                  </div>
                </th>
                <th className="px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-2">
                    Auto-renewal
                    <span className="text-xs">↓↑</span>
                  </div>
                </th>
                <th className="px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-2">
                    Renewal price
                    <Info size={14} className="text-gray-400" />
                    <span className="text-xs">↓↑</span>
                  </div>
                </th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {subscriptions.map((sub, index) => (
                <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{sub.id}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{sub.domain}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {sub.expirationDate}
                  </td>
                  <td className="px-6 py-4">
                    {/* Mock Toggle */}
                    <button
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                        sub.autoRenewal ? "bg-purple-600" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          sub.autoRenewal ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {sub.renewalPrice}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-4">
                      <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors text-sm">
                        Renew
                      </button>
                      <button className="text-purple-600 hover:text-purple-800 transition-colors">
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span>Page size:</span>
              <select className="border border-gray-200 rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
            </div>
            <span>1 to 1 of 1</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-300 cursor-not-allowed">
              <ChevronRight size={16} className="rotate-180" />
            </button>
            <span className="font-medium text-gray-900">Page 1 of 1</span>
            <button className="text-gray-300 cursor-not-allowed">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
