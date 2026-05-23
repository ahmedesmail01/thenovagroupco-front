import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { Home, ChevronRight, Search, Info, AlertCircle, Loader2 } from "lucide-react";
import { useSubscription } from "../../../hooks/billing/useSubscription";

export const Route = createLazyFileRoute("/_auth/billing/subscriptions")({
  component: SubscriptionsPage,
});

function SubscriptionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, isError } = useSubscription();

  const subscriptions = data?.subscription || [];
  const hasAnySubscription = subscriptions.length > 0;

  // Reset current page when query or page size changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, pageSize]);

  const filteredSubscriptions = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return subscriptions;

    return subscriptions.filter((sub) => {
      const matchesName = sub.package_name?.toLowerCase().includes(query);
      const matchesMethod = sub.payment_method?.toLowerCase().includes(query);
      const matchesId = sub.id ? String(sub.id).includes(query) : false;
      return matchesName || matchesMethod || matchesId;
    });
  }, [subscriptions, searchQuery]);

  const totalPages = Math.ceil(filteredSubscriptions.length / pageSize) || 1;

  const paginatedSubscriptions = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredSubscriptions.slice(startIndex, startIndex + pageSize);
  }, [filteredSubscriptions, currentPage, pageSize]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
        <p className="text-gray-500 font-medium">Loading subscription details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4 text-center max-w-md mx-auto">
        <AlertCircle className="w-12 h-12 text-red-500 animate-bounce" />
        <h2 className="text-xl font-bold text-gray-800">Failed to Load Subscriptions</h2>
        <p className="text-gray-500">
          We couldn't retrieve your current subscription details. Please verify your connection and try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 bg-purple-50 text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-purple-100 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

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
              placeholder="Search by package name, payment method..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-black border  border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-colors"
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
                    Subscribed date
                    <span className="text-xs">↓↑</span>
                  </div>
                </th>
                <th className="px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-2">
                    Expiration date
                    <span className="text-xs">↓↑</span>
                  </div>
                </th>
                {/* <th className="px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-2">
                    Status
                    <span className="text-xs">↓↑</span>
                  </div>
                </th> */}
                <th className="px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-2">
                    Price
                    <Info size={14} className="text-gray-400" />
                    <span className="text-xs">↓↑</span>
                  </div>
                </th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedSubscriptions.map((sub, index) => (
                <tr key={`${sub.package_name}-${index}`} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{sub.package_name}</div>
                    <div className="text-gray-500 text-xs mt-0.5">
                      {sub.id ? `ID: ${sub.id} • ` : ""}Method: {sub.payment_method}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {sub.subscribed_at ? sub.subscribed_at.split(" ")[0] : "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {sub.expiration_date || sub.billing_period}
                  </td>
                  {/* <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                      Active
                    </span>
                  </td> */}
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    ${Number(sub.price || sub.subscription_price).toFixed(2)}
                  </td>
                  {/* <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-4">
                      <Link
                        to="/membership"
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors text-sm"
                      >
                        Manage
                      </Link>
                      <Link
                        to="/membership"
                        className="text-purple-600 hover:text-purple-800 transition-colors"
                      >
                        <ChevronRight size={20} />
                      </Link>
                    </div>
                  </td> */}
                </tr>
              ))}

              {filteredSubscriptions.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <div className="max-w-md mx-auto flex flex-col items-center gap-3">
                      <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600">
                        <Info size={24} />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-base">
                        {hasAnySubscription ? "No matches found" : "No active subscription"}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {hasAnySubscription
                          ? "Try checking your spelling or search for another package term."
                          : "You don't have an active subscription package. Subscribe to a plan to access all premium features."}
                      </p>
                      {!hasAnySubscription && (
                        <Link
                          to="/membership"
                          className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors text-sm"
                        >
                          Explore Plans
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span>Page size:</span>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="border border-gray-200 rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
            <span>
              {filteredSubscriptions.length > 0
                ? `${(currentPage - 1) * pageSize + 1} to ${Math.min(
                  currentPage * pageSize,
                  filteredSubscriptions.length,
                )} of ${filteredSubscriptions.length}`
                : "0 to 0 of 0"}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`text-gray-500 transition-colors ${currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "hover:text-gray-700 cursor-pointer"
                }`}
            >
              <ChevronRight size={16} className="rotate-180" />
            </button>
            <span className="font-medium text-gray-900">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`text-gray-500 transition-colors ${currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "hover:text-gray-700 cursor-pointer"
                }`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

