import { createLazyFileRoute } from "@tanstack/react-router";
import { Settings2 } from "lucide-react";

export const Route = createLazyFileRoute("/_auth/commissions")({
  component: CommissionsRouteComponent,
});

// Mock data based on the screenshot provided
const commissions = [
  {
    amount: "$75.00",
    type: "Binary",
    date: "23/11/2025, 8:22:57 PM",
    referralName: "N/A",
    referralCode: "N/A",
  },
  {
    amount: "$75.00",
    type: "Binary",
    date: "23/11/2025, 8:22:57 PM",
    referralName: "N/A",
    referralCode: "N/A",
  },
  {
    amount: "$75.00",
    type: "Direct",
    date: "23/11/2025, 8:22:57 PM",
    referralName: "ahmed01",
    referralCode: "4000001",
  },
  {
    amount: "$75.00",
    type: "Direct",
    date: "23/11/2025, 8:22:57 PM",
    referralName: "ahmed01",
    referralCode: "4000001",
  },
  {
    amount: "$75.00",
    type: "Binary",
    date: "23/11/2025, 8:22:57 PM",
    referralName: "N/A",
    referralCode: "N/A",
  },
  {
    amount: "$75.00",
    type: "Binary",
    date: "23/11/2025, 8:22:57 PM",
    referralName: "N/A",
    referralCode: "N/A",
  },
  {
    amount: "$75.00",
    type: "Binary",
    date: "23/11/2025, 8:22:57 PM",
    referralName: "N/A",
    referralCode: "N/A",
  },
  {
    amount: "$75.00",
    type: "Binary",
    date: "23/11/2025, 8:22:57 PM",
    referralName: "N/A",
    referralCode: "N/A",
  },
];

function FilterButton() {
  return (
    <div className="mb-8 pl-4 pt-4">
      <button className="bg-[#295175] hover:bg-[#1e3a5f] text-white text-[13px] font-medium px-4 py-2.5 rounded-md flex items-center gap-2 transition-colors shadow-sm">
        <Settings2 className="w-4 h-4" />
        Filter By Date
      </button>
    </div>
  );
}

function CommissionsTable() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[900px]">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="py-4 px-6 font-semibold text-slate-400 text-sm">
              Amount
            </th>
            <th className="py-4 px-6 font-semibold text-slate-400 text-sm">
              Type
            </th>
            <th className="py-4 px-6 font-semibold text-slate-400 text-sm text-center">
              Date
            </th>
            <th className="py-4 px-6 font-semibold text-slate-400 text-sm text-center">
              Referral Name
            </th>
            <th className="py-4 px-6 font-semibold text-slate-400 text-sm text-center">
              Referral Code
            </th>
          </tr>
        </thead>
        <tbody>
          {commissions.map((c, idx) => (
            <tr
              key={idx}
              className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
            >
              <td className="py-6 px-6 text-slate-800 font-medium text-[15px]">
                {c.amount}
              </td>
              <td className="py-6 px-6 text-slate-700 font-medium text-[15px]">
                {c.type}
              </td>
              <td className="py-6 px-6 text-slate-700 font-medium text-[15px] text-center">
                {c.date}
              </td>
              <td className="py-6 px-6 text-slate-800 font-medium text-[15px] text-center">
                {c.referralName}
              </td>
              <td className="py-6 px-6 text-slate-700 font-medium text-[15px] text-center">
                {c.referralCode}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CommissionsPagination() {
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

function CommissionsRouteComponent() {
  return (
    <div className="min-h-[calc(100vh-100px)] bg-[#f8fafc] w-full max-w-[1500px] mx-auto">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 min-h-[85vh] flex flex-col">
        {/* Header Actions */}
        <FilterButton />

        {/* Data Table */}
        <div className="flex-1 mt-2">
          <CommissionsTable />
        </div>

        {/* Pagination */}
        <CommissionsPagination />
      </div>
    </div>
  );
}
