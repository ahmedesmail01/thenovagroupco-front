import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createLazyFileRoute("/_auth/transactions")({
  component: TransactionsRouteComponent,
});

// Mock data
const transactions = Array(8).fill({
  fromUser: "test_main",
  fromUserId: "400000",
  toUser: "test_main",
  toUserId: "400000",
  amount: "$5000.00",
  date: "23/11/2025, 8:22:57 PM",
});

function TabHeader({
  activeTab,
  onTabChange,
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
}) {
  return (
    <div className="flex gap-8 mb-8 border-b border-slate-100">
      <button
        onClick={() => onTabChange("commission")}
        className={`pb-4 text-[15px] font-medium transition-all ${
          activeTab === "commission"
            ? "text-[#295175] border-b-[3px] border-[#295175]"
            : "text-slate-400 border-b-[3px] border-transparent hover:text-slate-600"
        }`}
      >
        Commission Transactions
      </button>
      <button
        onClick={() => onTabChange("token")}
        className={`pb-4 text-[15px] font-medium transition-all ${
          activeTab === "token"
            ? "text-[#295175] border-b-[3px] border-[#295175]"
            : "text-slate-400 border-b-[3px] border-transparent hover:text-slate-600"
        }`}
      >
        Token Transactions
      </button>
    </div>
  );
}

function TransactionsTable() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[900px]">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="py-4 px-4 font-semibold text-slate-400 text-sm w-[20%]">
              From User
            </th>
            <th className="py-4 px-4 font-semibold text-slate-400 text-sm w-[15%]">
              From Use ID
            </th>
            <th className="py-4 px-4 font-semibold text-slate-400 text-sm w-[20%]">
              To User
            </th>
            <th className="py-4 px-4 font-semibold text-slate-400 text-sm w-[15%]">
              To User ID
            </th>
            <th className="py-4 px-4 font-semibold text-slate-400 text-sm w-[15%]">
              Amount
            </th>
            <th className="py-4 px-4 font-semibold text-slate-400 text-sm w-[15%]">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, idx) => (
            <tr
              key={idx}
              className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
            >
              <td className="py-6 px-4 text-slate-800 font-medium text-[15px]">
                {tx.fromUser}
              </td>
              <td className="py-6 px-4 text-slate-700 font-medium text-[15px]">
                {tx.fromUserId}
              </td>
              <td className="py-6 px-4 text-slate-800 font-medium text-[15px]">
                {tx.toUser}
              </td>
              <td className="py-6 px-4 text-slate-700 font-medium text-[15px]">
                {tx.toUserId}
              </td>
              <td className="py-6 px-4 text-[#10b981] font-medium text-[15px]">
                {tx.amount}
              </td>
              <td className="py-6 px-4 text-slate-700 font-medium text-sm">
                {tx.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TransactionsPagination() {
  return (
    <div className="flex items-center justify-center gap-2 mt-auto pt-8 pb-4">
      <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors shadow-sm border border-slate-100 font-bold text-xs">
        &lt;
      </button>
      <button className="w-8 h-8 rounded-full bg-[#295175] flex items-center justify-center text-white shadow-md font-semibold text-xs">
        1
      </button>
      <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors shadow-sm border border-slate-100 font-semibold text-xs">
        2
      </button>
      <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors shadow-sm border border-slate-100 font-semibold text-xs">
        3
      </button>
      <div className="w-8 h-8 flex items-center justify-center text-slate-400 font-bold tracking-widest leading-none pb-2 text-xs">
        ...
      </div>
      <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors shadow-sm border border-slate-100 font-semibold text-xs">
        10
      </button>
      <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors shadow-sm border border-slate-100 font-bold text-xs">
        &gt;
      </button>
    </div>
  );
}

function TransactionsRouteComponent() {
  const [activeTab, setActiveTab] = useState("token");

  return (
    <div className="min-h-[calc(100vh-100px)]  bg-[#f8fafc] w-full max-w-[1500px] mx-auto">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 min-h-[85vh] flex flex-col">
        {/* Tab Header */}
        <div className="pt-2 pl-4">
          <TabHeader activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Data Table */}
        <div className="flex-1 mt-6">
          <TransactionsTable />
        </div>

        {/* Pagination */}
        <TransactionsPagination />
      </div>
    </div>
  );
}
